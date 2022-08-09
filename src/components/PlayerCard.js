import React from 'react'
import { ListItem } from '@chakra-ui/react'
import { useDrag } from 'react-dnd'

function PlayerCard({item, type, index, onDropPlayer}) {
    const [{isDragging}, dragRef] = useDrag({
        type: type,
        item: () => ({...item, index}),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()

            if(dropResult && item) {
                onDropPlayer(item)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    })
  return (
    <ListItem p='2' borderRadius={'md'} boxShadow='md' mb='2' mt='2' textAlign={'center'} ref={dragRef}>
        {item.name}
    </ListItem>
  )
}

export default PlayerCard