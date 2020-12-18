import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Customers from './components/Customers'
import Training from './components/Training'
import Home from './components/Home'
import AddCustomer from './components/AddCustomer'
import './App.css';
import { AppBar, Toolbar } from "@material-ui/core";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position='static' style={{letterSpacing: 8}} >
          <Toolbar>
          <img src="DonkeyLogo.png" className="logodonk"/>
          <h1>Donkey Fit App</h1>
          </Toolbar>

        </AppBar>
        <div>
          <div style={{paddingTop: 20, wordSpacing: 20 }}>
        <Link to="/">Home</Link>{' '}
        <Link to="/customers">Customers</Link>{' '}
        <Link to="/training">Training</Link>{' '}
          </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/customers" component={Customers} />
          <Route path="/training" component={Training} />
          <Route path='*' render={() => <h1>Uups, App is in developement</h1>} />
        </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
