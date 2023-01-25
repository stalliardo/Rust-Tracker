import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Navbar from './components/navbar/Navbar';
import Auth from './components/auth/Auth';
import PageNotFound from './components/errors/PageNotFound';
import Index from './routes/Index';
import Server from './routes/Server';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Index />} />
            <Route path="*" element={<PageNotFound />}/>
            <Route path="/auth" element={<Auth />} />
            <Route path="servers">
              <Route index element={<PageNotFound />}/>
              <Route path=":serverId" element={<Server />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  </Provider>,
);

