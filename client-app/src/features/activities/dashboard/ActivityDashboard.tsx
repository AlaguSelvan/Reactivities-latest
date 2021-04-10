import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: Boolean;
  openForm: (id?: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

const ActivityDashboard = ({activities, selectedActivity, selectActivity, createOrEdit, cancelSelectActivity, editMode, openForm, closeForm, deleteActivity}: Props) => {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList deleteActivity={deleteActivity} selectActivity={selectActivity} activities={activities} />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode ?
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
            closeForm={closeForm}
          /> : null}
          {editMode ? <ActivityForm activity={selectedActivity} createOrEdit={createOrEdit} closeForm={closeForm} /> : null}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
