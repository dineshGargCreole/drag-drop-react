import './App.css';
import OneCard from './components/OneCard';
import TwoCard from './components/TwoCard';
import { ChakraProvider } from '@chakra-ui/react'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import InnerTwoCard from './components/InnerTwoCard';


function App() {
  return (
    <div>
      {/* <OneCard /> */}
      <DndProvider backend={HTML5Backend}>
        <ChakraProvider>
          {/* <TwoCard /> */}
          <InnerTwoCard />
        </ChakraProvider>
      </DndProvider>
    </div>
  );
}

export default App;
