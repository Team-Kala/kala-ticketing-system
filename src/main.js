import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Header from './containers/headerContainer';
import LogoHeader from './components/logoHeader';
import TicketContainer from './containers/ticketsContainer';
import TicketForm from './components/TicketForm';
import SignUp from './components/SignUp';
import './style.css'


const App = () => {
  const [darkMode, setDarkMode] = useState(true)

  const darkModeHandler = () => {
    setDarkMode(!darkMode)
  }

  const renderDark = <div style={{ backgroundColor: "#212121", color: "#eee" }} >
    <LogoHeader darkSwitch={darkModeHandler} colors={{ background: "#677569", btnOutline: '#eeee', btnBorder: '#eeee'}}/>
    <Routes>
      <Route path='/' element={<TicketContainer colors={{ card: "#3b3b3b", font: "#cfcfcf", titleFont: "#FAFAFA"}} />}></Route>
      <Route path='/form' element={<TicketForm />}></Route>
    </Routes>
  </div>

  const renderLight = <div>
    <LogoHeader darkSwitch={darkModeHandler} colors={{background: "#ACC4B0"}}/>
    <Routes>
      <Route path='/' element={<TicketContainer colors={{ card: "#E1E1E1", font: "#4b4b4b", titleFont: "#212121" }}/>}></Route>
      <Route path='/form' element={<TicketForm />}></Route>
    </Routes>
  </div>

  return (
    <div>
      {/* <div style={{ backgroundColor: "#212121", color: "#eee" }} >
      <LogoHeader darkSwitch={darkModeHandler} colors={{ background: "#677569", btnOutline: '#eeee', btnBorder: '#eeee' }} />
      <SignUp />
      </div> */}
      {darkMode ? renderDark : renderLight}
      </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);