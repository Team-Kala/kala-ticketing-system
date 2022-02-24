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
          <article className='ticketCard' style={{ backgroundColor: props.colors.card, color: props.colors.font}} >
            <div className='ticketHead'>
              <div className='ticket-title'>
                <h4 style={{ color: props.colors.titleFont, fontWeight:'800', paddingLeft:'30px'}} >{props.ticket.issue_title}</h4>
              </div>
              <div className='delete-button'>
                <button className='delete' onClick={handleDelete}>
                  <i className='bi bi-trash'></i>
                </button>
              </div>
            </div>
            <div>
              <ul className='ticketDetailList'>
                <li className='ticketDetail'><label>Name</label>: {props.ticket.first_name}</li>
                <li className='ticketDetail'>
                  <label>Summary</label>: {props.ticket.issue_summary}
                </li>
                <li className='ticketDetail'>
                  <label>Department</label>: {props.ticket.department}
                </li>
                <li className='ticketDetail'><label>Priority</label>: {props.priority}</li>
                <li className='ticketDetail'><label>Status</label>: {props.ticket.status}</li>
                <li className='ticketDetail'><label>Date</label>: {props.ticket.date}</li>
              </ul>
            </div>
          </article>
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;
