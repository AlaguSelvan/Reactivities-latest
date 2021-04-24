import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'

const Navbar = () => {
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
      </Container>
    </Menu>
  )
}

export default observer(Navbar)
