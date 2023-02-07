import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Auth from './components/auth/Auth';
import PageNotFound from './components/errors/PageNotFound';
import Index from './routes/Index';
import Server from './routes/Server';
import SignOut from './routes/SignOut';
import AddedServers from './routes/AddedServers';
import Alerts from './routes/Alerts';
import ViewAlerts from './components/alertsPage/ViewAlerts';
import EditAlert from './components/alertsPage/EditAlert';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Index />} />
            <Route path="*" element={<PageNotFound />}/>
            <Route path="/auth" element={<Auth />} />
            <Route path="/sign-out" element={<SignOut />} />
            <Route path="/server">
              <Route index element={<PageNotFound />}/>
              <Route path=":serverId" element={<Server />}/>
            </Route>
            <Route path="/alerts">
              <Route index element={<ViewAlerts />}/>
              <Route path="edit">
                <Route path=":alertId" element={<EditAlert />}/>
              </Route>
            </Route>
            <Route path="servers" element={<AddedServers />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  </Provider>,
);

