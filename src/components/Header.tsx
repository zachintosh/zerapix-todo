import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

export default function Header(): JSX.Element {
  return (
    <AppBar position="sticky">
      <Container maxWidth="sm">
        <Box sx={{ padding: '16px 0' }}>Too Due</Box>
      </Container>
    </AppBar>
  )
}
