import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/button";

import "../styles/room.scss"

export function Room() {
  return (
    <>
      <div id="page-room">
        <header>
          <div className="content">
            <img src={logoImg} alt="letmeask" />
            <div> codigo </div>
          </div>
        </header>
        <main className="content">
          <div className="room-title">
            <h1>sala</h1>
            <span className="bg"> 4 perguntas</span>
          </div>
          <form>
            <textarea placeholder="o que voce quer perguntar ?" />
            <div className="form-footer">
              <span> Para enviar uma pergunta faça, <button>seu login </button> </span>
              <Button type="submit">
                Enviar pergunta
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default Room;
