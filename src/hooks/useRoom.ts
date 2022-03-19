import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";



type FirebaseQuestion = Record<string,{
    author:{
      name: string,
      avatar: string,
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
    likes: Record<string, {
      authorId: string
    }>
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
    likeCount: number,
    likeId: string | undefined, 
  }



export function useRoom(roomId: string) {

  const { user } = useAuth();
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
        likeCount: Object.values(value.likes ?? {}).length,
        likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
       }
      })
      setTitle(databaseRoom.title);
      setQuestion(parsedQuestion)
    })

    return () => {
      roomREf.off('value');
    }
  }, [roomId, user?.id]);

  return{question, title}

}
