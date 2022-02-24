const express = require('express');
const router = express.Router();

const ticketController = require('../controller/ticketController');

router.get('/test', (req, res) => res.json({ msg: 'backend works' }));

router.get('/', ticketController.getTickets, (req, res) => {
  res.status(200).json(res.locals.tickets);
});

router.post(
  '/add',
  ticketController.addTicket,
  ticketController.getTickets,
  (req, res) => {
    res.status(200).json(res.locals.tickets);
  }
);

router.delete(
  '/remove',
  ticketController.removeTicket,
  ticketController.getTickets,
  (req, res) => {
    res.status(200).json(res.locals.tickets);
  }
);

// NOTE: Redone by Leo - might have errors
router.patch(
  '/update',
  ticketController.updatePriority,
  ticketController.getTickets,
  (req, res) => {
    res.status(200).json(res.locals.tickets)
  }
);

module.exports = router;
