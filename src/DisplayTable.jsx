import React from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { Box } from '@material-ui/core';

export default function DisplayTable(props) {
  const { departures } = props;
  return (
    <Box width="100%">
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            height={300}
            width={width}
            headerHeight={30}
            rowHeight={30}
            rowCount={departures.length}
            rowGetter={({ index }) => departures[index]}
          >
            <Column label="Carrier" dataKey="carrier"flexGrow={1} width={100}/>
            <Column label="Time" dataKey="time" flexGrow={1} width={100} />
            <Column label="Destination" dataKey="Destination" flexGrow={1} width={100} />
            <Column label="Train#" dataKey="trainNumber" flexGrow={1} width={100} />
            <Column label="Track#" dataKey="trackNumber" flexGrow={1} width={100} />
            <Column label="Status" dataKey="status" flexGrow={1} width={100} />
          </Table>
        )}
      </AutoSizer>
    </Box>
  );
}
