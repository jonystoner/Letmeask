import { FormEvent, useState } from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { Link, useHistory } from "react-router-dom";

import "../styles/auth.scss";
import { Button } from "../components/button";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState(" ");

  async function handleCreateRom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }
    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="testes" />
        <strong>Crie salas de Q&A ao vivo </strong>
        <p> Tire as dùvidas da sua audiencia em tempo-real </p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala </h2>
        </div>
        <form onSubmit={handleCreateRom}>
          <input
            type="text"
            className="rounded-md ml-3 border-2 border-gray-700 text-center"
            placeholder="Nome da Sala"
            onChange={(event) => setNewRoom(event.target.value)}
            value={newRoom}
          />
          <Button type="submit">Criar sala</Button>
        </form>
        <p className="mt-8">
          {" "}
          Quer entrar em uma sala existente{" "}
          <Link className="text-blue-500 text-base" to="/">
            {" "}
            clique qui{" "}
          </Link>{" "}
        </p>
      </main>
    </div>
  );
}
