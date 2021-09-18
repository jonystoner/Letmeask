import illustrationImg from  "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { Link } from "react-router-dom"

import '../styles/auth.scss'
import { Button } from "../components/button";



export function NewRoom() {
  //const {user} = useAuth();

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
        <form>
            <input type="text"
              placeholder="Nome da Sala"
            />
            <Button type="submit" >
                Criar sala 
            </Button>
            </form>
            <p> Quer entrar em uma sala existente <Link to="/" > clique  qui </Link> </p>
       </main>

    </div>
  );
}
