import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './containers/headerContainer';
import TicketContainer from './containers/ticketsContainer';
import TicketForm from './components/modal';
import './style.css'


const App = () => {
  return ( 
    <div>
    <Header />
    <Routes>
      <Route exact path='/' element={<TicketContainer/>}></Route>
      <Route exact path='/form' element={<TicketForm/>}></Route>
    </Routes>
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);