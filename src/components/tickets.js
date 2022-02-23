import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Ticket = (props) => {


  const handleDelete = () => {
    console.log('THIS IS THE ID', props.ticketID)
    fetch('/api/remove', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ _id: props.ticketID }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.setTickets(data);
      })
      .catch((err) => console.log('Error deleting ticket', err));
  };

  return (
    <Draggable key={props.index} draggableId={`${props.ticketID}${props.index}`} index={props.index}>
      {(provided) => (
        <div ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <article>
            <div className='ticketHead'>
              <div className='ticket-title'>
                <h4>{props.ticket.issue_title}</h4>
              </div>
              <div className='delete-button'>
                <button className='delete' onClick={handleDelete}>
                  <i className='bi bi-trash'></i>
                </button>
              </div>
            </div>
            <div>
              <ul className='ticketDetailList'>
                <li className='ticketDetail'>Name: {props.ticket.first_name}</li>
                <li className='ticketDetail'>
                  Summary: {props.ticket.issue_summary}
                </li>
                <li className='ticketDetail'>
                  Department: {props.ticket.department}
                </li>
                <li className='ticketDetail'>Priority: {props.ticket.priority}</li>
                <li className='ticketDetail'>Status: {props.ticket.status}</li>
                <li className='ticketDetail'>Date: {props.ticket.date}</li>
              </ul>
            </div>
          </article>
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;
