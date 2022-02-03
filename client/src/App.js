
import './App.css';
import {Fragment} from "react"

//components

import InputRomanValues from "./components/InputRomanValues"
import ListRomanValues from "./components/ListRomanValues"


function App() {
  return (
    <Fragment>
    <div className="container">
      <InputRomanValues/>
      <ListRomanValues />
      </div>
      
    </Fragment>
    
  );
}

export default App;




