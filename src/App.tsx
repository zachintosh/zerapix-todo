import { useState } from 'react'
import './App.css'
import useTodos from './data-services/useTodos'
import useChecked from './data-services/useChecked'
import Header from './components/Header';
import AddNewItemField from './components/AddNewItemField';
import ToDoList from './components/ToDoList';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

function App() {
  const {todos, addItem} = useTodos()

  // FILTER (with highlighting)
  // ADD NEW
  // DELETE

  /**
   * Normally I would expect checked/unchecked state to be provided by the backend,
   * rather than handling it on the frontend (unless we were hoping to do optimistic UI,
   * which is partially what's implemented here).
   */
  const { checked, checkItem } = useChecked()

  const uncheckedItems = todos.filter(({ id }) => !checked[id])
  const checkedItems = todos.filter(({ id }) => checked[id])
  
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{padding: '32px 0'}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" component="h4">
              To Do
            </Typography>

            <AddNewItemField addItem={addItem}/>
            
            <ToDoList todos={uncheckedItems} checkedItems={checked} checkItem={checkItem} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" component="h4">
              Done
            </Typography>
            <ToDoList todos={checkedItems} checkedItems={checked} checkItem={checkItem} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default App
