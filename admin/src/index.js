import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router';
import { ApolloClient , ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
	  cache: new InMemoryCache(),
 		uri: "https://graphqlzero.almansi.me/api"
});

ReactDOM.render(
  <React.StrictMode>
  	<ApolloProvider client={client}>
    	<App client={client} />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
