import React, { useEffect, useState } from 'react';
import Ticket from './tickets';

const TicketColumn = (props) => {
  const [tickets, setTickets] = useState([]);

  const ticketItems = [];
  for (let i = 0; i < tickets.length; i++) {
    // console.log('TICKETS LENGTH:', tickets.length);
    // console.log('TICKETS:', tickets);
    ticketItems.push(
      <Ticket
        key={i}
        ticketID={tickets[i]._id}
        ticket={tickets[i]}
        setTickets={setTickets}
        tickets={tickets}
      />
    );
    // console.log('TICKETS[i]:', tickets[i]);
    // console.log('TICKET ITEMS:', ticketItems);
  }

  //  const filteredTickets = ticketItems.filter(
  //    (ticket) => ticket.priority === props.priority
  //  );

  // const filterTickets = (array) => {
  //   const filteredTickets = [];
  //   array.filter((ticket) => props.priority === ticket.priority);
  //   console.log('FILTERED TICKETS:', filteredTickets);
  //   return filteredTickets;
  // };

  const fetchTickets = () => {
    fetch('/api')
      .then((res) => res.json())
      .then((tickets) => setTickets(tickets))
      .catch((err) => console.log('Error getting tickets.', err));
  };

  useEffect(() => {
    fetchTickets();
    // filterTickets(ticketItems);
  }, []);

  //this successfully filters all of the tickets in our ticketItems array into a new array based on its priority
  const highPriority = ticketItems.filter(
    (ticket) => ticket.props.ticket.priority === 'high'
  );
  const mediumPriority = ticketItems.filter(
    (ticket) => ticket.props.ticket.priority === 'medium'
  );
  const lowPriority = ticketItems.filter(
    (ticket) => ticket.props.ticket.priority === 'low'
  );
  // console.log('HIGH:', highPriority);
  // console.log('MEDIUM:', mediumPriority);
  // console.log('LOW:', lowPriority);

  if (props.priority === 'high') {
    return <div id={props.priority}>{highPriority}</div>;
  }
  if (props.priority === 'medium') {
    return <div id={props.priority}>{mediumPriority}</div>;
  }
  if (props.priority === 'low') {
    return <div id={props.priority}>{lowPriority}</div>;
  }

  //original return statement with different appraoches to filtering without a conditional return statement
  // return (
  //   <div>
  //     <div id={props.priority}>
  //       {console.log('PROPS.PRIORITY:', props.priority)}
  //       {/* {console.log('FILTERED TICKETS:', filteredTickets)} */}
  //       {ticketItems}
  //       {/* {ticketItems.filter((ticket) => ticket.priority == props.priority)} */}
  //       {/* {filteredTickets} */}
  //     </div>
  //   </div>
  // );
};

export default TicketColumn;
