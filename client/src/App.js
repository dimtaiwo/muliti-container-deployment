import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/other">Other Page</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/" component={Fib} />
            <Route path="/other" component={OtherPage} />
          </Switch>
        </header>
      </Router>
    </div>
  );
}

export default App;


