import { useHistory } from "react-router";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg"

import '../styles/auth.scss'
import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";


export function Home() {

  const history = useHistory();
  
  const {user,signinWithGoogle} = useAuth();

  async function handleCreateRom(){
    if(!user){
     await signinWithGoogle()
    }

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
            <input type="text"
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
