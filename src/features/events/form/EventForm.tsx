import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../app/store/Store';
import { createId } from '@paralleldrive/cuid2';
import { updateEvent, createEvent } from '../eventSlice';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { categoryOptions } from './categoryOptions';
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'


export default function EventForm() {
    const { register, handleSubmit, control, setValue, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onTouched' });
    let { id } = useParams();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function onSubmit(data: FieldValues) {
        id = id ?? createId();

        event ? dispatch(updateEvent({ ...event, ...data, date: data.date.toString() }))
            : dispatch(createEvent({ ...data, id: id, hostedBy: 'Bob', attendees: [], hostPhotoURL: '', date: data.date.toString() }));
        navigate(`/events/${id}`)
    }

    return (
        <Segment clearing>
            <Header content='Event Details' sub color='teal' />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    defaultValue={event?.title || ''}
                    placeholder='Event title'
                    {...register('title', { required: 'Title is required' })}
                    error={errors.title && errors.title.message}
                />
                <Controller
                    name='category'
                    control={control}
                    rules={{ required: 'Category is required' }}
                    defaultValue={event?.category}
                    render={({ field }) => (
                        <Form.Select
                            options={categoryOptions}
                            placeholder='Category'
                            clearable
                            {...field} //, { required: 'Category is required' 
                            onChange={(_, d) => setValue('category', d.value, { shouldValidate: true })}
                            error={errors.category && errors.category.message}
                        />

                    )}
                />


                <Form.TextArea
                    defaultValue={event?.description || ''}
                    placeholder='Description'
                    {...register('description', { required: 'Description is required' })}
                    error={errors.description && errors.description.message}
                />
                <Header sub content='Location Details' color='teal' />
                <Form.Input
                    defaultValue={event?.city || ''}
                    placeholder='City'
                    {...register('city', { required: 'City is required' })}
                    error={errors.city && errors.city.message}
                />

                <Form.Input
               
                    defaultValue={event?.venue || ''}
                    placeholder='Venue'
                    {...register('venue', { required: 'Venue is required' })}
                    error={errors.venue && errors.venue.message}
                />
                <Form.Field>
                    <Controller
                        name='date'
                        control={control}
                        rules={{ required: 'Date is required' }}
                        defaultValue={event && new Date(event.date) || null}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={value => setValue('date', value, { shouldValidate: true })}
                                showTimeSelect
                                timeCaption='time'
                                dateFormat='MMM d, yyyy h:mm aa'
                                placeholderText='Event Date and Time'
                            />

                        )}
                    />
                </Form.Field>

                <Button loading={isSubmitting} disabled={!isValid} type='submit' floated='right' positive content='Submit' />
                <Button disabled={isSubmitting} type='button' floated='right' content='Cancel' as={Link} to='/events' />
            </Form>
        </Segment>
    )
}