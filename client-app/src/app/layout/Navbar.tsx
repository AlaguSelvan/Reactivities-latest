import { observer } from 'mobx-react-lite'
import { Link, NavLink } from 'react-router-dom'
import { Button, Container, Dropdown, Menu, Image } from 'semantic-ui-react'
import { useStore } from '../stores/store'

const Navbar = () => {
  const {userStore: {user, logout}} = useStore()
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" exact name="Activities" />
        <Menu.Item as={NavLink} to="/errors" exact name="Errors" />
        <Menu.Item>
          <Button as={NavLink} to="/createActivity" exact positive content="Create Activity" />
        </Menu.Item>
        {user && (
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profiles/${user.username}`}
                  text='My profile'
                  icon='user'
                />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  )
}

export default observer(Navbar)
