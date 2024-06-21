"use client"

import './globals.css';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import NavBar from '../commons/Nav/NavBar';

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
     <html lang="en">
        <head>
          <link rel='png' href='./favicon.ico' ></link>
        </head>
        <body
          id="page-wrap"
          className={`w-full no-scrollbar md:w-full`}
        >
          <NavBar />
          {children}
        </body>
      </html>
    </Provider>
  );
}
