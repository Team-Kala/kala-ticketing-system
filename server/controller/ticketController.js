const fs = require('fs');
const path = require('path');

const db = require('../model/ticketModel');

const ticketController = {};


ticketController.getTickets = (req, res, next) => {
  const query =
    'SELECT tt._id, tt.first_name, dt.name AS department, tt.issue_title, tt.issue_summary, st.name AS status, pt.name AS priority, tt.date FROM ticket_table AS tt JOIN department_table AS dt ON tt.department_id= dt._id JOIN status_table AS st ON tt.status_id=st._id JOIN priority_table AS pt ON tt.priority_id=pt._id;';

  db.query(query)
    .then((response) => {
      res.locals.tickets = response.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `ticketController.getTickets: ERROR: ${err}`,
        message: {
          err: 'ticketController.getTickets: ERROR: Check server logs for details',
        },
      });
    });
};

ticketController.addTicket = (req, res, next) => {
  const {
    first_name,
    department,
    issue_title,
    issue_summary,
    priority,
  } = req.body;
  const status = 1;
  const date = new Date();

  const query =
    'INSERT INTO ticket_table (first_name, department_id, issue_title, issue_summary, status_id, priority_id, date) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  const values = [
    first_name,
    department,
    issue_title,
    issue_summary,
    status,
    priority,
    date,
  ];

  db.query(query, values)
    .then((data) => {
      next();
    })
    .catch((err) => {
      return next({
        log: `ticketController.addTicket: ERROR: THIS IS OUR ERRORRRRRRRR ${err}`,
        message: {
          err: 'ticketController.addTicket: ERROR: Check server logs for details',
        },
      });
    });
};

ticketController.removeTicket = (req, res, next) => {
  const ticketId = req.body._id;
  const thisQuery = 'DELETE FROM ticket_table WHERE _id = $1';
  const values = [ticketId];
  console.log('REQ BODY ID:', req.body._id)
  db.query(thisQuery, values)
    .then((data) => {
      next();
    })
    .catch((err) => {
      next({
        log: `ticketController.removeTicket: ERROR: ${err}`,
        message: {
          err: 'ticketController.removeTicket: ERROR: Check server logs for details',
        },
      });
    });
};
module.exports = ticketController;
