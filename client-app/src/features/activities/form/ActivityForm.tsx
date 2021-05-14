import { ErrorMessage, Field, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { ChangeEvent, FormEvent, useEffect } from "react"
import { useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { Button, Form, FormField, Header, Label, Segment } from "semantic-ui-react"
import { v4 as uuid } from "uuid"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { useStore } from "../../../app/stores/store"
import * as Yup from 'yup'
import MyTextInput from "../../../app/common/form/MyTextInput"
import MyTextArea from "../../../app/common/form/MyTextArea"
import MySelectInput from "../../../app/common/form/MySelectInput"
import { categoryOptions } from "../../../app/common/options/categoryOptions"
import MyDateInput from "../../../app/common/form/MyDateInput"
import { Activity, ActivityFormValues } from "../../../app/models/activity"

const ActivityForm = () => {
  const {activityStore} = useStore()
  const history = useHistory()
  const {loadActivity, createActivity, updateActivity, loadingInitial} = activityStore
  const {id} = useParams<{id: string}>();
  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required('The activity category is required'),
    date: Yup.string().required('The activity date is required'),
    city: Yup.string().required('The activity city is required'),
    venue: Yup.string().required('The activity venue is required'),
  })

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(new ActivityFormValues(activity)))
  }, [id, loadActivity])

  function handleFormSubmit(e: ActivityFormValues) {
    if(!activity.id) {
      let newActivity = {
        ...e,
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

  // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   const {name, value} = event.target
  //   setActivity({...activity, [name]: value})
  // }

  if(loadingInitial) return <LoadingComponent content="Loading Activity..." />

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={values => handleFormSubmit(values)}
      >
        {({handleSubmit, isValid, isSubmitting, dirty}) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='title' placeholder='title' />
            <MyTextArea rows={3} placeholder='Description' name='description' />
            <MySelectInput options={categoryOptions} placeholder='Description' name='description' />
            <MyTextInput placeholder='Category' name='category' />
            <MyDateInput 
              placeholderText='Date'
              name='date'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <Header content='Activity Details' sub color='teal' />
            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Venue' name='venue' />
            <Button 
              disabled={isSubmitting || !dirty || !isValid}
            loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
            <Button as={Link} to="/activities" floated='right' negative type='button' content='cancel' />
          </Form>
        )}
      </Formik>
    </Segment>
  )
}
export default observer(ActivityForm)
