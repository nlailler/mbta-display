import { useContext } from 'react';
import { ACTIONS } from './StoreReducer';
import { DisplayContext } from './DisplayProvider';

function dataLoaded({ dispatch, data }) {
  const { departures } = data;
  dispatch({ type: ACTIONS.DATA_LOADED, departures });
}

export default function useActions() {
  const { dispatch } = useContext(DisplayContext);

  return {
    dataLoaded: (data) => dataLoaded({ dispatch, data }),
  };
}
