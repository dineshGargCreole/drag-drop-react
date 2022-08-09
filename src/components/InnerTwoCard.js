import { Container, Stack, Flex, List, Heading, ListItem } from '@chakra-ui/react'
import React, {useState} from 'react'
import { useDrop } from 'react-dnd'
import PlayerCard from './PlayerCard'

function InnerTwoCard() {
    const [players, setPlayers] = useState([
        {name: 'Player 1'},
        {name: 'Player 2'},
        {name: 'Player 3'},
        {name: 'Player 4'},
        {name: 'Player 5'},
    ])
    const [team, setTeam] = useState([
        {name: 'Team 1', subTeam: [{name: 'SubTeam 1'}]},
        {name: 'Team 2', subTeam: []},
        {name: 'Team 3', subTeam: []},
    ])

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
        // setTeam(prev => prev.filter((_, i) => i !== item.index));
        // setPlayers(prev => [...prev, item])
    }

  return (
    <Container maxW={'800px'}>
        <Flex justify={'space-between'} height='90vh' align={'center'}>
            <Stack width={'300px'}>
                <List p="4" minH="70vh" boxShadow='xl' borderRadius='md' ref={removeFromTeamRef}>
                    {players.map((e,i) => (
                        <PlayerCard
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
                <List p="4" minH="70vh" boxShadow='xl' borderRadius='md' ref={addToTeamRef}>
                    {team.map((e,i) => (
                        <List p='2' borderRadius={'md'} boxShadow='md' mb='2' textAlign={'center'} key={e.name} ref={addToTeamRef}>
                            <ListItem key={e.name}>{e.name}</ListItem>
                            {e.subTeam.map((s,index) => (
                                <PlayerCard
                                    key={s.name}
                                    item={s}
                                    type='team'
                                    index={index}
                                    onDropPlayer={removeFromTeamRef}
                                />
                            ))}
                        </List>
                    ))}
                </List>
            </Stack>
        </Flex>
    </Container>
  )
}

export default InnerTwoCard