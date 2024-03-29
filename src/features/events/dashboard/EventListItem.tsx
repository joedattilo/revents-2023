import { ItemGroup, Segment, SegmentGroup, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { AppEvent } from '../../../app/types/event';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/Store';
import { deleteEvent } from '../eventSlice';

type Props = {
    event: AppEvent
}

export default function EventListItem({ event }: Props) {

    const dispatch = useAppDispatch();

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
                    <Icon name='clock' /> {event.date}
                    <Icon name='marker' /> {event.venue}
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
                <Button onClick={() => dispatch(deleteEvent(event.id))} color='red' floated='right' content='Delete'  ></Button>
                <Button color='teal' floated='right' content='View' as={Link} to={`/events/${event.id}`} ></Button>
            </Segment>
        </SegmentGroup>
    )
}