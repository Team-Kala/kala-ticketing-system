import React, { useEffect, useState } from 'react';

const Ticket = (props) => {
  //const { _id, first_name, department, issue_title, issue_summary, status, priority, date } = state.props

  // useEffect(() => {});

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
    <article>
      <div className='ticketHead'>
        <div className='ticket-title'>
          <h4>{props.ticket.issue_title}</h4>
        </div>
        <div className='delete-button'>
          {/* <button class='btn btn-outline-secondary'>🗑 </button> */}
          <button className='delete' onClick={handleDelete}>
            <i className='bi bi-trash'></i>
          </button>
        </div>
      </div>
      <div>
        <ul className='ticketDetailList'>
          {/* {console.log('PROPS:', props)} */}
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
  );
};

export default Ticket;
