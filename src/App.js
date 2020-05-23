import React from "react";
import DisplayProvider from './context/DisplayProvider';
import DisplayContainer from './DisplayContainer';

export default function App() {
  return (
    <DisplayProvider>
      <DisplayContainer />
    </DisplayProvider>
  );
}
