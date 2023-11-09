import { ChangeEvent, useState } from 'react';
import { Button, ButtonGroup, Form, Header, Segment } from 'semantic-ui-react';
import { AppEvent } from '../../../app/types/event';
import { createId } from '@paralleldrive/cuid2';

type Props = {
    setFormOpen: (value: boolean) => void;
    addEvent: (event: AppEvent) => void;
    selectedEvent: AppEvent | null;
    updateEvent: (event: AppEvent) => void;
}

export default function EventForm({ setFormOpen, addEvent, selectedEvent, updateEvent}: Props) {
    
    const initialValues = selectedEvent ?? {
        title: '', 
        category: '',
        description: '',
        city: '', 
        venue: '', 
        date: ''
    }

    const [values, setValues] = useState(initialValues);


    function onSubmit(){
        selectedEvent ? updateEvent({...selectedEvent, ...values}) : 
            addEvent({...values, id: createId(), hostedBy: 'Bob', attendees: [], hostPhotoURL: '' });
        
        setFormOpen(false);
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setValues({...values,[name]: value})
    }

    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Update Event' : 'Create Event'} />
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
                <Button type='button' floated='right' content='Cancel'
                    onClick={() => { setFormOpen(false) }} />
            </Form>
        </Segment>
    )
}