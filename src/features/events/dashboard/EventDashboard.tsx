import { Grid } from "semantic-ui-react";
import EventList from './EventList';
import EventForm from '../form/EventForm';
import { sampleData } from '../../../app/api/sampleData';
import { useEffect, useState } from 'react';
import { AppEvent } from '../../../app/types/event';

type Props = {
  formOpen: boolean
  setFormOpen: (value: boolean) => void;
  selectEvent: (event: AppEvent | null) => void;
  selectedEvent: AppEvent | null;
}

export default function ({formOpen, setFormOpen, selectEvent, selectedEvent}: Props) {

  const [events, setEvents] = useState<AppEvent[]>([])
  
  //the dependency causes this not to be called any time theree is a change
  useEffect(() => {
    setEvents(sampleData);
  },[])

  function addEvent(event: AppEvent){
    
    setEvents(prevState => {
        return[...prevState,event]
    })
  }

  function updateEvent(updatedEvent: AppEvent){
    setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt));
    selectEvent(null);
    setFormOpen(false);
  }

  function deleteEvent(eventId: string){
    setEvents(events.filter(evt => evt.id != eventId));
  }


  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} selectEvent={selectEvent} deleteEvent={deleteEvent}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen &&
        <EventForm 
        key={selectedEvent ? selectedEvent.id : 'create'}
        setFormOpen={setFormOpen} 
        addEvent={addEvent}
        selectedEvent={selectedEvent} 
        updateEvent={updateEvent} />}
      </Grid.Column>
    </Grid>
  )
}