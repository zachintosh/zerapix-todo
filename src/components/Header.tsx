import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

export default function Header(): JSX.Element {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Box sx={{ padding: '16px 0'}}>The Best ToDo App You Will Ever Use (TM)</Box>
      </Container>
    </AppBar>
  )
}
