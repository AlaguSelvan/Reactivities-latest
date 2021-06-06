import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite"
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react"
import { Photo, Profile } from "../../app/models/profile"
import { useStore } from "../../app/stores/store";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";

interface Props {
  profile: Profile
}

const ProfilePhotos: React.FC<Props> = ({profile}) => {
  const {profileStore: {isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto}}= useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false)
  const [target, setTarget] = useState('')
  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() =>setAddPhotoMode(false))
  }

  function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  const handleDeletePhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button floated="right" basic content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
            {addPhotoMode ? (
              <PhotoUploadWidget uploadPhoto={handlePhotoUpload} uploading={uploading} />
            ) : (
              <Card.Group itemsPerRow={5}>
                {profile.photos?.map(photo => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid width={2}>
                        <Button
                          basic
                          color="green"
                          content="Main"
                          name={photo.id}
                          disabled={photo.isMain}
                          loading={target === photo.id && uploading}
                          onClick={e => handleSetMainPhoto(photo, e)}
                          />
                        <Button
                          basic
                          name={photo.id}
                          color="red"
                          icon="trash"
                          loading={target === photo.id && loading}
                          onClick={e => handleDeletePhoto(photo, e)}
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
              </Card.Group>
            )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default observer(ProfilePhotos)

