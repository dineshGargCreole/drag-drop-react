import { Container, Stack, Flex, List, Heading } from '@chakra-ui/react'
import React, {useState} from 'react'
import { useDrop } from 'react-dnd'
import Player from './Player'



function TwoCard() {
    const [players, setPlayers] = useState([
        {name: 'Player 1'},
        {name: 'Player 2'},
        {name: 'Player 3'},
        {name: 'Player 4'},
        {name: 'Player 5'},
    ])
    const [team, setTeam] = useState([])

    const [{isOver}, addToTeamRef] = useDrop({
        accept: 'player',
        collect: (monitor) => ({isOver: !!monitor.isOver()})
    })
    const [{isOver: isPlayerOver}, removeFromTeamRef] = useDrop({
        accept: 'team',
        collect: (monitor) => ({isOver: !!monitor.isOver()})
    })


    const movePlayerToTeam = (item) => {
        console.log(item)
        setPlayers(prev => prev.filter((_, i) => i !== item.index));
        setTeam(prev => [...prev, item])
    }

    const removePlayerFromTeam = (item) => {
        console.log(item)
        setTeam(prev => prev.filter((_, i) => i !== item.index));
        setPlayers(prev => [...prev, item])
    }
    
  return (
    <Container maxW={'800px'}>
        <Flex justify={'space-between'} height='90vh' align={'center'}>
            <Stack width={'300px'}>
                <Heading fontSize={'3x1'} color='yellow.800' textAlign={'center'}>Players</Heading>
                <List p="4" minH="70vh" boxShadow='xl' borderRadius='md' ref={removeFromTeamRef}
                    bgGradient={
                        isPlayerOver
                            ? 'linear(to-b, yellow.300, yellow.500)'
                            : 'linear(to-b, yellow.100, yellow.200)'
                    }
                >
                    {players.map((e,i) => (
                        <Player
                            key={e.name}
                            item={e}
                            type='player'
                            index={i}
                            onDropPlayer={movePlayerToTeam}
                        />
                    ))}
                </List>
            </Stack>
            <Stack width={'300px'}>
            <Heading fontSize={'3x1'} color='teal.800' textAlign={'center'}>Team</Heading>
                <List p="4" minH="70vh" boxShadow='xl' borderRadius='md' ref={addToTeamRef}
                    bgGradient={
                        isOver
                            ? 'linear(to-b, teal.300, teal.500)'
                            : 'linear(to-b, teal.100, teal.200)'
                    }
                >
                    {team.map((e,i) => (
                        <Player
                            key={e.name}
                            item={e}
                            type='team'
                            index={i}
                            onDropPlayer={removePlayerFromTeam}
                        />
                    ))}
                </List>
            </Stack>
        </Flex>
    </Container>
  )
}

export default TwoCard