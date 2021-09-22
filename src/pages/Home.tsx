import { useHistory } from "react-router";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();

  const { user, signinWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRom() {
    if (!user) {
      await signinWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("essa sala não existe.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="testes" />
        <strong>Crie salas de Q&amp;A ao-vivo </strong>
        <p> Tire as dùvidas da sua audiencia em tempo-real </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
        </div>
        <button onClick={handleCreateRom} className="create-room">
          <img src={googleIconImg} alt="logo do Google" />
          Crie sua sala com o Google
        </button>

        <div className="separator">Ou entre na Sala</div>
        <form onSubmit={handleJoinRoom}>
          <input
            type="text"
            className="ml-5"
            placeholder="Digite o código da sala"
            onChange={(event) => setRoomCode(event.target.value)}
            value={roomCode}
          />
          <Button type="submit">Entrar na sala</Button>
        </form>
      </main>
    </div>
  );
}
