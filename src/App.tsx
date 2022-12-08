import './App.css'
import useTodos from './data-services/useTodos'
import Header from './components/Header'
import AddNewItemField from './components/AddNewItemField'
import ToDoList from './components/ToDoList'
import Container from '@mui/material/Container'

function App(): JSX.Element {
  const { todos, addItem, deleteItem, updateItem } = useTodos()

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ padding: '32px 0' }}>
        <AddNewItemField addItem={addItem} />

        <ToDoList todos={todos} updateItem={updateItem} deleteItem={deleteItem} />
      </Container>
    </>
  )
}

export default App
