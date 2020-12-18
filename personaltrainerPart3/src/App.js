import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Customers from './components/Customers'
import Training from './components/Training'
import Home from './components/Home'
import AppCalendar from './components/Calendar'
import AddCustomer from './components/AddCustomer'
import './App.css';
import { AppBar, Toolbar } from "@material-ui/core";
import { Calendar } from "react-big-calendar";
import { Button } from 'evergreen-ui'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position='static' style={{letterSpacing: 8}} >
          <Toolbar >
          <img src="DonkeyLogo.png" className="logodonk"/>
          <h1>Donkey Fit App</h1>
          </Toolbar>
        </AppBar>
        <div>
          <div style={{paddingTop: 20, wordSpacing: 20 }}>
        <Button marginRight={5} appearance="primary"><Link to="/"> <h2 style={{color: '#f3f3f3'}}>Home</h2></Link>{' '}</Button>
        <Button marginRight={5} appearance="primary"><Link to="/customers"><h2 style={{color: '#f3f3f3'}}>Customers</h2></Link>{' '}</Button>
        <Button marginRight={5} appearance="primary"><Link to="/training"><h2 style={{color: '#f3f3f3'}}>Training</h2></Link>{' '}</Button>
        <Button marginRight={5} appearance="primary"><Link to="/calendar"><h2 style={{color: '#f3f3f3'}}>Calendar</h2></Link>{' '}</Button>
          </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/customers" component={Customers} />
          <Route path="/training" component={Training} />
          <Route path="/calendar" component={AppCalendar} />
          <Route path='*' render={() => <h1>Uups, App is in developement</h1>} />
        </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
