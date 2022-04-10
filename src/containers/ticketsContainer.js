import React, { useEffect, useState } from 'react';
import TicketColumn from '../components/ticketColumns'

const TicketContainer = (props) => {
  // useEffect(() => {
  //   //where fetch request will go 
  // })

  //const [ ticketPriority, sortTickets ] = useState([])


  return (
    <div className='ticket-list'>
      <div className='columns' id='high-priority'>
        <TicketColumn priority='high' />
      </div>
      <div className='columns' id='medium-priority'>
        <TicketColumn priority='medium' />
      </div>
      <div className='columns' id='low-priority'>
        <TicketColumn priority='low' />
      </div>
    </div>
  );
}

export default TicketContainer;