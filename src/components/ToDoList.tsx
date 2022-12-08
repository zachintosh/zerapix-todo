import React from 'react'
import List from '@mui/material/List'
import { Todo } from '../types'
import ToDoItem from './ToDoItem'
import Typography from '@mui/material/Typography'

type ToDoListProps = {
  todos: Todo[]
  updateItem: (updatedItem: Todo) => void
  deleteItem: (id: number) => void
}

export default function ToDoList({
  todos = [],
  updateItem,
  deleteItem,
}: ToDoListProps): JSX.Element {
  return (
    <>
      {todos.length > 0 ? (
        <List>
          {todos.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} updateItem={updateItem} deleteItem={deleteItem} />
          ))}
        </List>
      ) : (
        <Typography variant="body2" component="p" sx={{ opacity: 0.7, padding: '8px 0' }}>
          There are no items in this list.
        </Typography>
      )}
    </>
  )
}
