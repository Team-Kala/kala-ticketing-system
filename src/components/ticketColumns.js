import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Ticket from '../components/tickets';



const TicketColumn = ({ dropColumn, info, setTickets }) => {

  return (
    <Droppable droppableId={dropColumn}>
      {(provided) => (
        <div className='columns' {...provided.droppableProps} ref={provided.innerRef}>
          {info.map((el, index) => (
            <Ticket
              key={el._id}
              ticketID={el._id}
              ticket={el}
              setTickets={setTickets}
              tickets={el}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
};

export default TicketColumn;
