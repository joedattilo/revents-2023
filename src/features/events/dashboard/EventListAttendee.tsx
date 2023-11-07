import { List, Image } from 'semantic-ui-react';
import { Attendee } from '../../../app/types/event';

//this is where you assign the local variable name to the Typescript type
type Props = {

    attendee: Attendee
}

export default function EventListAttendee({attendee}: Props) {
  return (
    <List.Item>
        <Image size='mini' circular src={attendee.photoURL}/>
    </List.Item>
  )
}