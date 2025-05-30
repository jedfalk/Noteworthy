import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
    <App />
  </BrowserRouter> 
  </ApolloProvider>

);