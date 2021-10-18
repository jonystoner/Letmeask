import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AdminRoom } from "./pages/AdminRoom";
import { Room } from "./pages/Room";

import "./styles/global.scss";

import { AuthContextProvider } from "./contexts/AuthContext";


function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
