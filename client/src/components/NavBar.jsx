import {
  Navbar,
  Container,
  Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = ({ onSignOut, isAdmin }) => {
  return (
    <Navbar bg='light' style={{ marginBottom: '1em', boxShadow: '4px 3px 8px 1px #969696' }} sticky='top'>
      <Container>
        <Navbar.Brand>The Tone Dropper</Navbar.Brand>
        <Navbar.Collapse className='justify-content-end'>
          <Link to='/'>
            <Button variant='primary' style={{ marginLeft: '.3em' }}>Home</Button>
          </Link>
          <Link to='/toneLog'>
            <Button variant='primary' style={{ marginLeft: '.3em' }}>Tone Log</Button>
          </Link>
          <Button variant='danger' style={{ marginLeft: '.3em' }} onClick={onSignOut}>Sign out</Button>
          {isAdmin &&
            <Link to='/admin'>
              <Button variant='secondary' style={{ marginLeft: '.3em' }}>Admin</Button>
            </Link>
            // eslint-disable-next-line
          } 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
