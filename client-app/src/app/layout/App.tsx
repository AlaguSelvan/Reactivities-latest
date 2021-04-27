import './styles.css';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../errors/TestError';
import {ToastContainer} from 'react-toastify'
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';

function App() {
  const location = useLocation();

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render = {() => (
          <>
            <Navbar />
            <Container style={{marginTop: '7em'}}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route exact path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} exact path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route path='/errors' component={TestErrors} />
                <Route exact path='/server-error' component={ServerError} />
              </Switch>
              <Route path="/not-found" component={NotFound} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
