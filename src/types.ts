export type Todo = {
  completed: boolean
  id: number
  title: string
  userId: number
}

export type CheckedItems = Record<number, boolean>