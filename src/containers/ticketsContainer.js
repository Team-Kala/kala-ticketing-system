import React, { useEffect, useState } from 'react';
import TicketColumn from '../components/ticketColumns'

import { DragDropContext } from 'react-beautiful-dnd';

const initialColumns = {
  High: {
    id: 'High',
    list: []
  },
  Medium: {
    id: 'Medium',
    list: []
  },
  Low: {
    id: 'Low',
    list: []
  }
}
const TicketContainer = (props) => {
  const [tickets, setTickets] = useState([]);
  const [columns, setColumns] = useState(initialColumns);

  const fetchTickets = () => {
    fetch("/api")
      .then((res) => res.json())
      .then((tickets) => {
        setTickets(tickets);
      })
      .catch((err) => console.log("Error getting tickets.", err));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const highPriority = tickets.filter(
    (ticket) => ticket.priority.toLowerCase() === 'high'
  );
  const mediumPriority = tickets.filter(
    (ticket) => ticket.priority.toLowerCase() === 'medium'
  );
  const lowPriority = tickets.filter(
    (ticket) => ticket.priority.toLowerCase() === 'low'
  );

  useEffect(() => {
    setColumns({
      High: {
        id: 'High',
        list: highPriority
      },
      Medium: {
        id: 'Medium',
        list: mediumPriority
      },
      Low: {
        id: 'Low',
        list: lowPriority
      }
    })
  }, [tickets])

  const onDragEndHandler = ({ source, destination }) => {
    // console.log('source ', source);
    // console.log('destination ', destination);

    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId]
    const end = columns[destination.droppableId]
    // console.log('start ', start);
    // console.log('end ', end);

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      return setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      // return null
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };


      let priorityId;
      if (end.id === 'High') {
        priorityId = 3
      } else if (end.id === 'Medium') {
        priorityId = 2
      } else if (end.id === 'Low') {
        priorityId = 1
      }

      //updates DB
      const body = { _id: start.list[source.index]._id, priority_id: priorityId }
      console.log(body);
      fetch('/api/update', {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(body),
      })
        .then((res) => console.log('Success!'))
        .catch((err) => console.log(err))

      //changes the priority in state(maintains the order unless refreshed)
      newEndCol.list[destination.index].priority = end.id

      // Update the state
      return setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <div className="ticket-list">
        {Object.values(columns).map((col, index) => (
          <TicketColumn
            key={index}
            info={col.list}
            dropColumn={col.id}
            setTickets={setTickets}
            colors={props.colors}
          />
        ))}
      </div>
    </DragDropContext>
  );
}


// STRETCH: Toggle between different sorting options priority & department
// return (
//   <div className='ticket-list'>
//     <div className='columns' id='department - software'>
//       <TicketColumn priority='high' />
//     </div>
//     <div className='columns' id='department - facilities'>
//       <TicketColumn priority='medium' />
//     </div>
//     <div className='columns' id='department - marketing'>
//       <TicketColumn priority='low' />
//     </div>
//   </div>
// );


export default TicketContainer;