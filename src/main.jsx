import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const uri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

root.render(
  <React.StrictMode>
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: uri
    }}
  >
  
    <App />
  
  </Auth0Provider>
  </React.StrictMode>
);

