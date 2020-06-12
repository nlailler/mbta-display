import React from 'react';
import { render } from '@testing-library/react';
import getData from '../src/utils/getData';
import MockApp from './MockApp';
import '@testing-library/jest-dom/extend-expect';
import useActions from '../src/context/useActions';
import { LOADING_TEXT, NORTH_STATION_DEPARTURES } from '../src/utils/constants';

jest.mock('../src/utils/getData');
jest.mock('../src/context/useActions');

const dataLoaded = () => {};

describe('Test display container', () => {
  getData.mockImplementation(() => []);
  useActions.mockImplementation(() => ({ dataLoaded }));

  beforeEach(() => {
    getData.mockClear();
  });

  test('Should show loading when the app is loading.', async () => {
    const initialState = { isLoading: true, departures: [] };
    const { queryByText } = render(<MockApp initialState={initialState}/>);
    expect(queryByText(LOADING_TEXT)).toBeInTheDocument();
  });

  test('Should not show loading and show table instead when the app is done loading.', async () => {
    const initialState = { isLoading: false, departures: [] };
    const { queryByText } = render(<MockApp initialState={initialState}/>);
    expect(queryByText(LOADING_TEXT)).not.toBeInTheDocument();
    expect(queryByText(NORTH_STATION_DEPARTURES)).toBeInTheDocument();
  });
});
