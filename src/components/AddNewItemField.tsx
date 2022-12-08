import React, { useRef } from 'react'
import TextField from '@mui/material/TextField'

type AddNewItemFieldProps = {
  addItem: (title: string) => void
}

export default function AddNewItemField({ addItem }: AddNewItemFieldProps): JSX.Element {
  const fieldRef = useRef<HTMLInputElement>()
  
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault() // prevent form from reloading the page
    const newItemTitle = fieldRef.current?.value
    if (fieldRef.current && newItemTitle) {
      addItem(newItemTitle)
      fieldRef.current.value = ''
    }
  }
  
  return (
    <form onSubmit={onSubmit}>
      <TextField id="outlined-basic" label="Add Item" variant="standard" inputRef={fieldRef} />
    </form>
  )
}
