import React, { useContext,useEffect } from 'react';
import { Box, List, ListItem } from '@material-ui/core';
import moment from 'moment';
import getData from './utils/getData';
import { DisplayContext } from './context/DisplayProvider';
import DisplayTable from './DisplayTable';

export default function DisplayContainer() {
  useEffect(()=> {
    const departures = getData();
  }, []);

  const { departures } = useContext(DisplayContext);
  const now = moment();
  return (
    <>
      <List>
        <ListItem dense>
          <Box textAlign="left" width="25%">{now.format('dddd')}</Box>
          <Box textAlign="center" width="50%">North Station Departures</Box>
          <Box textAlign="right" width="25%">Current Time</Box>
        </ListItem>
        <ListItem dense>
          <Box textAlign="left" width="50%">{now.format('MM-DD-YY')}</Box>
          <Box textAlign="right" width="50%">{now.format('h:mm a')}</Box>
        </ListItem>
      </List>
      <DisplayTable departures={departures} />
    </>
  );
}
