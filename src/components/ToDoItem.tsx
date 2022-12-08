import { useState, useRef } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Todo } from '../types'
import EditItemField from './EditItemField'

type ToDoItemProps = {
  todo: Todo
  updateItem: (updatedItem: Todo) => void
  deleteItem: (id: number) => void
}

export default function ToDoItem({ todo, updateItem, deleteItem }: ToDoItemProps): JSX.Element {
  const labelId = `checkbox-${todo.id}`

  const [editing, setEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>()

  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = Boolean(anchorEl)

  function handleClick(event: React.UIEvent): void {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(): void {
    setAnchorEl(null)
  }

  function handleStartEdit(): void {
    handleClose()
    setEditing(true)

    // I would use MUI's autoFocus prop on TextField, but it's conflicting with the overlay menu closing, since it pulls focus.
    // This setTimeout pushes the call to focus the input to the next event cycle. Still feels immediate, but happens after the overlay begins to close.
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <ListItem
      disableGutters
      secondaryAction={
        <IconButton size="small" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          onClick={() => updateItem({ ...todo, completed: !todo.completed })}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>

      {!editing ? (
        <ListItemText
          id={labelId}
          primary={todo.title}
          sx={{ textDecoration: todo.completed ? 'line-through' : undefined }}
        />
      ) : (
        <EditItemField
          inputRef={inputRef}
          todo={todo}
          updateItem={updateItem}
          onEdit={() => setEditing(false)}
        />
      )}

      <Menu
        id="todo-item-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleStartEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => deleteItem(todo.id)}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </ListItem>
  )
}
