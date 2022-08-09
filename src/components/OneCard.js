import '../App.css';
import React, {useState, useEffect} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const data = [
    {
      id: "item-1",
      content: "Item-1",
    },
    {
      id: "item-2",
      content: "Item-2",
    },
    {
      id: "item-3",
      content: "Item-3",
    },
    {
      id: "item-4",
      content: "Item-4",
    },
    {
      id: "item-5",
      content: "Item-5",
    },
    {
      id: "item-6",
      content: "Item-6",
    },
    {
      id: "item-7",
      content: "Item-7",
    },
    {
      id: "item-8",
      content: "Item-8",
    },
    {
      id: "item-9",
      content: "Item-9",
    },
  ];
  
  const reorder =(list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result;
  }
  
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250
  })
  
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 16,
    margin: '0 0 8px 0',
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
  })


function OneCard() {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(data)
    }, [])

    const onDragEnd = (result) => {
        if(!result.destination) {
        return;
        }
        const reorderedItems = reorder(items, result.source.index, result.destination.index)

        console.log(reorderedItems)
        setItems(reorderedItems)
    }
  return (
    <div className='main_content'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {
                items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className='card'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>  
                ))
              }
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default OneCard