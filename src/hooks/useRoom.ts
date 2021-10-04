import { useEffect, useState } from "react";
import { database } from "../services/firebase";



type FirebaseQuestion = Record<string,{
    author:{
      name: string,
      avatar: string,
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
  }>

type Questions = {
    id: string,
    author:{
      name: string,
      avatar: string,
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,  
  }



export function useRoom(roomId: string) {
  const [question, setQuestion] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");


  useEffect(() => {
    const roomREf = database.ref(`rooms/${roomId}`);

    roomREf.on('value', room =>{
      const databaseRoom = room.val()
      
      const firebaseQuestion: FirebaseQuestion  = databaseRoom.question ?? {};

      const parsedQuestion = Object.entries(firebaseQuestion).map(([key,value]) => {
       return  {
        id: key,
        content: value.content,
        author: value.author,
        isHighlighted: value.isHighlighted,
        isAnswered: value.isAnswered,
       }
      })
      setTitle(databaseRoom.title);
      setQuestion(parsedQuestion)
    })
  }, [roomId]);

  return{question, title}

}
