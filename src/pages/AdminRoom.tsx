import { useHistory, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import { Button } from "../components/button";
import { Question } from "../components/question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";

//import { useAuth } from "../hooks/useAuth";

import "../styles/room.scss";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};
export function AdminRoom() {
  //const { user } = useAuth();

  const history = useHistory();

  const params = useParams<RoomParams>();

  const roomId = params.id;

  const { question, title } = useRoom(roomId);

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');

  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/question/${questionId}`).remove();
    }
  }

  return (
    <>
      <div id="page-room">
        <header>
          <div className="content">
            <img src={logoImg} alt="letmeask" />
            <div className="flex flex-row ">
              <RoomCode code={roomId} />{" "}
              <Button
                isOutlined
                onClick={handleEndRoom}
                className="btn-info rounded-md box-border hover:bg-gray-300 bg-gray-200  w-44 text-purple-400 font-medium"
              >
                {" "}
                Encerrar Sala{" "}
              </Button>
            </div>
          </div>
        </header>
        <main className="content">
          <div className="room-title">
            <h1> {title} </h1>
            {question.length > 0 && (
              <span className="bg"> {question.length} pergunta </span>
            )}
          </div>

          <div className="question-list">
            {question.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover Pergunta" />
                  </button>
                </Question>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminRoom;


