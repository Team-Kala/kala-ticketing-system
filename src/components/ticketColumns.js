import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Ticket from '../components/tickets';



const TicketColumn = ({ dropColumn, info, setTickets, colors }) => {

  return (
    <Droppable droppableId={dropColumn}>
      {(provided) => (
        <div className='columns' {...provided.droppableProps} ref={provided.innerRef} style={{borderRadius: '5px'}}>
          <h2>{dropColumn}</h2>
          {info.map((el, index) => (
            <Ticket
              key={el._id}
              ticketID={el._id}
              ticket={el}
              setTickets={setTickets}
              tickets={el}
              index={index}
              colors={colors}
              piority={dropColumn}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
};

export default TicketColumn;
