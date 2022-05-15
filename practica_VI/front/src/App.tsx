import React, { useState } from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import PersonsList from './components/PersonsList';
import AddPerson from './components/AddPerson';

function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache()
  });

  console.log(`API URL ${process.env.REACT_APP_API_URL}`);

  const [reload, setReload] = useState<boolean>(true);

  const reloadHandler = () => {
    setReload(!reload);
  }

  return (
    <ApolloProvider client={client}>
      <AddPerson reloadHandler={reloadHandler} />
      <PersonsList />
    </ApolloProvider>
  );
}

export default App;