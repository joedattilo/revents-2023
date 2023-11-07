import { Grid } from "semantic-ui-react";
import EventList from './EventList';
import EventForm from '../form/EventForm';
import { sampleData } from '../../../app/api/sampleData';
import { useEffect, useState } from 'react';
import { AppEvent } from '../../../app/types/event';

type Props = {
  formOpen: boolean
  setFormOpen: (value: boolean) => void;
}

export default function ({formOpen, setFormOpen}: Props) {

  const [events, setEvents] = useState<AppEvent[]>([])

  //the dependency causes this not to be called any time theree is a change
  useEffect(() => {
    setEvents(sampleData);
  },[])

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen &&
        <EventForm setFormOpen={setFormOpen} />}
      </Grid.Column>
    </Grid>
  )
}