import { ChangeEvent, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../app/store/Store';
import { createId } from '@paralleldrive/cuid2';
import { updateEvent, createEvent } from '../eventSlice';



export default function EventForm() {
    let { id } = useParams();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const initialValues = event ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    }

    const [values, setValues] = useState(initialValues);


    function onSubmit() {
        id = id ?? createId(); 

        console.log(values);
        event ? dispatch(updateEvent({...event, ...values})) 
        : dispatch(createEvent({...values, id: id, hostedBy: 'Bob', attendees: [], hostPhotoURL: '' }));  
        navigate(`/events/${id}`)
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    return (
        <Segment clearing>
            <Header content={event ? 'Update Event' : 'Create Event'} />
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <input
                        name='title'
                        onChange={e => handleInputChange(e)}
                        value={values.title}
                        type='text' placeholder='Event title' />
                </Form.Field>
                <Form.Field>
                    <input
                        name='category'
                        onChange={e => handleInputChange(e)}
                        value={values.category}
                        type='text' placeholder='Category' />
                </Form.Field>
                <Form.Field>
                    <input
                        name='description'
                        onChange={e => handleInputChange(e)}
                        value={values.description}
                        type='text' placeholder='Description' />
                </Form.Field>
                <Form.Field>
                    <input
                        name='city'
                        onChange={e => handleInputChange(e)}
                        value={values.city}
                        type='text' placeholder='City' />
                </Form.Field>
                <Form.Field>
                    <input
                        name='venue'
                        onChange={e => handleInputChange(e)}
                        value={values.venue}
                        type='text' placeholder='Venue' />
                </Form.Field>
                <Form.Field>
                    <input
                        name='date'
                        onChange={e => handleInputChange(e)}
                        value={values.date}
                        type='date' placeholder='Date' />
                </Form.Field>

                <Button type='submit' floated='right' positive content='Submit' />
                <Button type='button' floated='right' content='Cancel' as={Link} to='/events' />
            </Form>
        </Segment>
    )
}