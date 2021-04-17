import { observer } from "mobx-react-lite"
import { ChangeEvent, FormEvent, useEffect } from "react"
import { useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { Button, Form, Segment } from "semantic-ui-react"
import { v4 as uuid } from "uuid"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { useStore } from "../../../app/stores/store"


const ActivityForm = () => {
  const {activityStore} = useStore()
  const history = useHistory()
  const {loadActivity, createActivity, updateActivity, loading, loadingInitial} = activityStore
  const {id} = useParams<{id: string}>();
  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (id) loadActivity(id).then((act) => setActivity(act!))
  }, [id, loadActivity])

  function handleSubmit(e: FormEvent) {
    if(activity.id.length === 0) {
      console.log('here')
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`)
      })
    } else {
      updateActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`)
      })
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target
    setActivity({...activity, [name]: value})
  }

  if(loadingInitial) return <LoadingComponent content="Loading Activity..." />

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Title' value={activity.title} onChange={handleInputChange} name='title' />
        <Form.TextArea placeholder='Description' value={activity.description} onChange={handleInputChange} name='description' />
        <Form.Input placeholder='Category' onChange={handleInputChange} value={activity.category} name='category' />
        <Form.Input placeholder='Date' type="date" onChange={handleInputChange} value={activity.date} name='date' />
        <Form.Input placeholder='City' onChange={handleInputChange} value={activity.city} name='city' />
        <Form.Input placeholder='Venue' onChange={handleInputChange} value={activity.venue} name='venue' />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button as={Link} to="/activities" floated='right' negative type='button' content='cancel' />
      </Form>
    </Segment>
  )
}
export default observer(ActivityForm)
