import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/button";
import { Question } from "../components/question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};
export function Room() {
  const { user } = useAuth();

  const params = useParams<RoomParams>();
  const [newQuestion, setnewQuestion] = useState("");

  const roomId = params.id;

  const {question, title} = useRoom(roomId);

  

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error(" You most be logged in");
    }
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/question`).push(question);

    setnewQuestion("");
  }

  return (
    <>
      <div id="page-room">
        <header>
          <div className="content">
            <img src={logoImg} alt="letmeask" />
            <div>
              <RoomCode code={roomId} />{" "}
            </div>
          </div>
        </header>
        <main className="content">
          <div className="room-title">
            <h1>  {title} </h1>
            {question.length > 0 && (
              <span className="bg"> {question.length} pergunta </span>
            )}
          </div>
          <form onSubmit={handleSendQuestion}>
            <textarea
              placeholder="o que voce quer perguntar ?"
              onChange={(event) => setnewQuestion(event.target.value)}
              value={newQuestion}
            />
            <div className="form-footer">
              {user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span className="ml-6"> {user.name} </span>
                </div>
              ) : (
                <span>
                  Para enviar uma pergunta faça, <button>seu login </button>{" "}
                </span>
              )}
              <Button type="submit" disabled={!user}>
                {" "}
                Enviar pergunta
              </Button>
            </div>
          </form>
          <div className="question-list">
            {question.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                />
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}

export default Room;
