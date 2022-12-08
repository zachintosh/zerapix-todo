import { useState, useEffect } from 'react'
import { Todo } from '../types'
import { getTodos, createTodo, deleteTodo, updateTodo } from './todo-service'

/**
 * NOTES
 * - I'm using "optimistic UI" practices for creating, updating, and deleting notes.
 * - This means I'm updating the local state before I wait for the request to confirm it completed successfully.
 * - This makes the UI feel immediate.
 * - There are good practices for handling errors and reverting the UI, but I haven't implemented them here.
 * - Optimistic UI is good here since we're dealing with checkboxes - it should feel immediate. Optimistc UI isn't always best.
 *
 * - This where I would implement React Query. It would replace most of this logic and add all its sweet, sweet features in.
 * - React Query has options to support optimistic UI.
 */

type UseTodosReturn = {
  todos: Todo[]
  addItem: (title: string) => Promise<void>
  deleteItem: (id: number) => Promise<void>
  updateItem: (updatedItem: Todo) => Promise<void>
}

export default function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    getTodos().then(setTodos)
  }, []) // Run only once on mount

  async function addItem(title: string): Promise<void> {
    setTodos((prev) => [
      {
        title,
        // Normally the ID would be created by the backend, but POST doesn't actually work
        id: prev.length + 200, // guarantee our fake ID here is above the number returned by the endpoint
        completed: false,
        userId: 1,
      },
      ...prev,
    ])
    await createTodo(title)
    return
  }

  async function deleteItem(idToDelete: number): Promise<void> {
    setTodos((prev) => prev.filter(({ id }) => id !== idToDelete))
    await deleteTodo(idToDelete)
    return
  }

  async function updateItem(updatedItem: Todo): Promise<void> {
    // We update the state optimistically here _before_ we make the request. This is called optimistic UI and usually best practice for UX like checkboxes that are tied to a backend.
    setTodos((prev) =>
      prev.map((todo) => {
        if (updatedItem.id === todo.id) return updatedItem
        return todo
      })
    )
    await updateTodo(updatedItem)
  }

  return { todos, addItem, deleteItem, updateItem }
}
