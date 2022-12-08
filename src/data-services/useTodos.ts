import {useState, useEffect} from 'react'
import { Todo } from '../types'

type UseTodosReturn = {
  todos: Todo[]
  addItem: (title: string) => void
}
 
export default function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        // This endpoint returns 200 items, so for the sake of being able to see the app, I shortened it to 10 here
        setTodos(json.slice(0, 10))
      })
  }, [])

  function addItem(title: string) {
    // TODO: Make the request to PUT
    setTodos((prev) => [{
      title,
      // Normally the ID would be created by the backend
      id: prev.length + 1,
      completed: false,
      userId: 1
    },
      ...prev])
    return 
  }

  return { todos, addItem }
}
