import React from 'react'
import List from '@mui/material/List'
import { Todo, CheckedItems } from '../types'
import ToDoItem from './ToDoItem'
import Typography from '@mui/material/Typography'

type ToDoListProps = {
  todos: Todo[]
  checkedItems: CheckedItems
  checkItem: (todo: Todo, checked: boolean) => void
}

export default function ToDoList({
  todos = [],
  checkedItems,
  checkItem,
}: ToDoListProps): JSX.Element {
  return (
    <>
      {todos.length > 0 ? (
        <List>
          {todos.map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              checked={!!checkedItems[todo.id]}
              checkItem={checkItem}
            />
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
