import React, { useEffect, useState } from 'react';
import TicketColumn from '../components/ticketColumns'

const TicketContainer = (props) => {
  // useEffect(() => {
  //   //where fetch request will go 
  // })

  //const [ ticketPriority, sortTickets ] = useState([])

  // NOTE: TicketContainer contains all tickets
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


// STRETCH: Toggle between different sorting options priority & department
// return (
//   <div className='ticket-list'>
//     <div className='columns' id='department - software'>
//       <TicketColumn priority='high' />
//     </div>
//     <div className='columns' id='department - facilities'>
//       <TicketColumn priority='medium' />
//     </div>
//     <div className='columns' id='department - marketing'>
//       <TicketColumn priority='low' />
//     </div>
//   </div>
// );


export default TicketContainer;