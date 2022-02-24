const express = require('express');
const router = express.Router();

const ticketController = require('../controller/ticketController');

router.get('/test', (req, res) => res.json({ msg: 'backend works' }));

router.get('/', 
  ticketController.getTickets, 
  (req, res) => {
    res.status(200).json(res.locals.tickets);
});

router.post('/add',
  ticketController.addTicket,
  ticketController.getTickets,
  (req, res) => {
    res.status(200)
    // console.log('res.status is: ', res.status)
    res.json(res.locals.tickets);
  }
);

router.delete('/remove',
  ticketController.removeTicket,
  ticketController.getTickets,
  (req, res) => {
    // console.log(res);
    res.sendStatus(504);
  }
);

module.exports = router;
