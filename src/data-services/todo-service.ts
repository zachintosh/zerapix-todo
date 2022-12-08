import { Todo } from '../types'

/**
 * NOTES
 * Normally I would handle errors better here, but it always depends on the situation.
 * Do we show error toast notifications? An error dialog? Fail silently? Always depends.
 * So for this case I'm just printing them to the console.
 */

export async function getTodos(): Promise<Todo[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    const todos = await res.json()
    return todos.slice(0, 10)
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function createTodo(title: string): Promise<void> {
  try {
    await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
    })
  } catch (e) {
    console.error(e)
  }
}

export async function updateTodo(updatedItem: Todo): Promise<void> {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedItem.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedItem),
    })
  } catch (e) {
    console.error(e)
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
  } catch (e) {
    console.error(e)
  }
}
