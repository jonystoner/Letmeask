import { createContext, useState } from 'react';

import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home';
import {NewRoom} from './pages/NewRoom'

import './styles/global.scss';

export  const TestContext = createContext({} as any); 

function App() {

  const [value, setValue] = useState("testes")

  return (
    <div>  
       <BrowserRouter>
        <TestContext.Provider value={{ value, setValue}} >
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
        </TestContext.Provider>
      </BrowserRouter>       
    </div>         
     
  );
}

export default App;
