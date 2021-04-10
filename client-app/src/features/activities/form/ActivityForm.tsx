import { ChangeEvent, FormEvent } from "react"
import { useState } from "react"
import { Button, Form, Segment } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}

const ActivityForm = ({activity: selectedActivity, createOrEdit, closeForm}: Props) => {

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState<Activity>(initialState)

  function handleSubmit(e: FormEvent) {
    createOrEdit(activity)
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target
    setActivity({...activity, [name]: value})
    
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Title' value={activity.title} onChange={handleInputChange} name='title' />
        <Form.TextArea placeholder='Description' value={activity.description} onChange={handleInputChange} name='description' />
        <Form.Input placeholder='Category' onChange={handleInputChange} value={activity.category} name='category' />
        <Form.Input placeholder='Date' onChange={handleInputChange} value={activity.date} name='date' />
        <Form.Input placeholder='City' onChange={handleInputChange} value={activity.city} name='city' />
        <Form.Input placeholder='Venue' onChange={handleInputChange} value={activity.venue} name='venue' />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button onClick={closeForm} floated='right' positive type='button' content='cancel' />
      </Form>
    </Segment>
  )
}
export default ActivityForm
