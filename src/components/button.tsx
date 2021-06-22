
//import { useState } from "react"

/*const [counter, setCounter ] = useState(0)

   function increment () {
        setCounter(counter + 1)
        */

type  ButtonProps = {
    text: string,
    
}

export function Button (props:ButtonProps){
         
      return(
        <button> {props.text} </button> 
      )
         
}

