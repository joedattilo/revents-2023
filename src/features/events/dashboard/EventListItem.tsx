import { ItemGroup, Segment, SegmentGroup, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { AppEvent } from '../../../app/types/event';

type Props = {

    event: AppEvent
    selectEvent: (event: AppEvent) => void
    deleteEvent: (eventId: string) => void
}

export default function EventListItem({event, selectEvent, deleteEvent}: Props) {
  return (
    <SegmentGroup>
        <Segment>
            <ItemGroup>
                <Item>
                    <Item.Image size='tiny' circular src={event.hostPhotoURL || 'user.png'} />
                    <Item.Content>
                        <Item.Header>{event.title}</Item.Header>
                        <Item.Description>Hosted by {event.hostedBy}</Item.Description>
                    </Item.Content>
                </Item>
            </ItemGroup>
        </Segment>
        <Segment>
            <span>
                <Icon name='clock'  /> {event.date}
                <Icon name='marker'/> {event.venue}
            </span>
        </Segment>
        <Segment secondary>
            <List horizontal>
                {event.attendees.map((attendee: any) => (
                <EventListAttendee attendee={attendee} key={attendee.id} />
               ))}
            </List>

        </Segment>
        <Segment clearing>
            <span>{event.description}</span>
            <Button color='red' floated='right' content='Delete' onClick={() => deleteEvent(event.id)} ></Button>
            <Button color='teal' floated='right' content='View' onClick={() => selectEvent(event)} ></Button>
        </Segment>
    </SegmentGroup>
  )
}