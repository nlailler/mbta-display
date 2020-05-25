import React from 'react';

export const DisplayContext = React.createContext({});

export default function DisplayProvider(props) {
  const { children, value } = props;

  return (
    <DisplayContext.Provider value={value}>
      {children}
    </DisplayContext.Provider>
  );
}
