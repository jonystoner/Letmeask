//import {useContext} from "react";

import { useHistory } from "react-router";

import {firebase, auth } from "../services/firebase"

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg"

import '../styles/auth.scss'
import { Button } from "../components/button";



export function Home() {

  const history = useHistory();



  function handleCreateRom(){

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      console.log(result);
    })

    history.push('/rooms/new')
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
            <img src={googleIconImg} alt="logo do Google"/>
            Crie sua sala com o Google
        </button>
        <div className="separator">Ou entre na Sala</div>
        <form>
            <input className="input" type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit" >
                Entrar na sala
            </Button>
        </form>
      </main>
    </div>
  );
}
