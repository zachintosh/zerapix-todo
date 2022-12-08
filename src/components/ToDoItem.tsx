import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import React from 'react'
import { Todo } from '../types'

type ToDoItemProps = {
  todo: Todo
  checked: boolean
  checkItem: (todo: Todo, checked: boolean) => void
}

export default function ToDoItem({ todo, checked, checkItem }: ToDoItemProps): JSX.Element {
  const labelId = `checkbox-${todo.id}`
  return (
    <ListItemButton role={undefined} onClick={() => checkItem(todo, !checked)} dense>
      <ListItem disableGutters>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={todo.title} sx={{ textDecoration: checked ? 'line-through' : undefined }} />
      </ListItem>
    </ListItemButton>
  )
}
