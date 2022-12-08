import { useState, useEffect } from 'react'
import { Todo, CheckedItems } from '../types'

type UseCheckedReturn = {
  checked: CheckedItems
  checkItem: (todo: Todo, checked: boolean) => void
}

export default function useChecked(): UseCheckedReturn {
  const [checked, setChecked] = useState<CheckedItems>({})

  function checkItem(todo: Todo, checked: boolean): void {
    setChecked(prev => ({...prev, [todo.id]: checked}))
  }
  
  return {checked, checkItem}
}