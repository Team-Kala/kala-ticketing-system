import React from 'react';

function getTickets() {
  fetch('/api')
    .then((res) => res.json())
    .then((tickets) => {
      setTickets(tickets);
    })
    .catch((err) => console.log('Error in getting Tickets', err));
}

function addTicket(ticket) {
  fetch('/api/add', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: ticket.first_name,
      department: ticket.department,
      issue_title: ticket.issue_title,
      issue_summary: ticket.issue_summary,
      status: ticket.status,
      priority: ticket.priority,
    }),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        setTickets(result);
      },
      (error) => {
        setStatus('An error occured');
        console.log(error);
      }
    );
}

function remove(ticket) {
  fetch('/api/remove', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      _id: ticket._id
    }),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        setTickets(result);
      },
      (error) => {
        setStatus('An error occured');
        console.log(error);
      }
    );
}

