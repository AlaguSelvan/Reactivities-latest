import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([])

  const fetchActivity = async() => {
    const response = await axios.get('http://localhost:5000/api/activities')
    setActivities(response.data)
  }

  useEffect(() => {
    fetchActivity()
  }, [])

  return (
    <div>
      <Header as="h2" icon="users" content="reactivities" />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
       </List>
    </div>
  );
}

export default App;
