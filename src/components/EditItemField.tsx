import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Todo } from '../types'

type AddNewItemFieldProps = {
  updateItem: (updatedItem: Todo) => void
  todo: Todo
  onEdit: () => void
  inputRef: React.Ref<HTMLInputElement | undefined>
}

export default function EditItemField({
  updateItem,
  todo,
  onEdit,
  inputRef,
}: AddNewItemFieldProps): JSX.Element {
  const [value, setValue] = useState(todo.title)

  function handleUpdate(): void {
    updateItem({ ...todo, title: value })
    onEdit()
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault() // prevent form from reloading the page
    handleUpdate()
  }

  function handleChange(event: React.ChangeEvent): void {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        fullWidth
        inputRef={inputRef}
        onBlur={handleUpdate}
        onChange={handleChange}
        id="outlined-basic"
        value={value}
        label="Edit Item"
        variant="standard"
      />
    </form>
  )
}
