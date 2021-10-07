import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Chat from "./components/Chat/Chat"
import Background from "./components/Background";

import './index.scss'

function App() {
  return (
    <Router>
      <div className="main">
        <Link to="/"  />
        <Link to="/about" />
        <Switch>
          <Route exact path="/">
            <Chat />
          </Route>
          <Route path="/about">
            <Background />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
