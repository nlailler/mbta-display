import React, { useContext, useEffect } from 'react';
import { Box, List, ListItem } from '@material-ui/core';
import moment from 'moment';
import getData from './utils/getData';
import { DisplayContext } from './context/DisplayProvider';
import DisplayTable from './DisplayTable';
import useActions from './context/useActions';
import { LOADING_TEXT, NORTH_STATION_DEPARTURES } from './utils/constants';

export default function DisplayContainer() {
  const { dataLoaded } = useActions();

  useEffect(() => {
    (async () =>
      dataLoaded({
        departures: await getData(),
      })
    )();
  }, []);

  const { isLoading, departures } = useContext(DisplayContext);
  const now = moment();

  /*
    Only show future or recent departures. 30 minutes would normally not be
    considered recent, but it makes it easier to see different train statuses
    (i.e. less time dependent for demo purposes).
  */
  const cutoff = moment(now).subtract(30, 'minutes');
  const futureDepartures = departures.filter(departure => departure.datetime > moment(cutoff));
  return (
    <>
      {isLoading
        ? <div>{LOADING_TEXT}</div>
        : <>
          <List>
            <ListItem dense>
              <Box textAlign="left" width="25%">{now.format('dddd')}</Box>
              <Box textAlign="center" width="50%">{NORTH_STATION_DEPARTURES}</Box>
              <Box textAlign="right" width="25%">Current Time</Box>
            </ListItem>
            <ListItem dense>
              <Box textAlign="left" width="50%">{now.format('MM-DD-YY')}</Box>
              <Box textAlign="right" width="50%">{now.format('h:mm a')}</Box>
            </ListItem>
          </List>
          <DisplayTable departures={futureDepartures} />
        </>
      }
    </>
  );
}
