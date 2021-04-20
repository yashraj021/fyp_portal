import './App.css';
import { TablePage } from './pages/Table-page';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { UserDetails } from './pages/User-details';
import Logo from './assets/logo.png'
import Notification from './assets/notification.png'



function App() {
  return (
    <div className="App">
      <header className="header-main">
        <div className="title">
          <img src={Logo} className="logo" />
          <span className="title_text">
            St. Marry's Hospital
          </span>

        </div>
        <div className="utils_container">
          <button className="new_button">
            + New Patient
          </button>
          <img src={Notification} className='notification'/>
        </div>
      </header>
      <Switch>
        <Route path='/users/:id' render={props => <UserDetails {...props} />}>

        </Route>
        <Route path='/'>
          <TablePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
