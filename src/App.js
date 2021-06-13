import './App.css';
import TablePage from './pages/Table-page';
import {Route, Switch, useHistory,} from "react-router-dom";
import {UserDetails} from './pages/User-details';
import Logo from './assets/logo.png'
// import Notification from './assets/notification.png'
import {Login} from "./pages/Login";
import {updateAxiosToken} from "./api";
import {useEffect, useState} from "react";
import {getHospitalInfo} from "./api/hospital";


function App() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [hospital, setHospital] = useState(null);
  if (!token) {
    history.push('/auth');
  } else {
    updateAxiosToken(token);
    history.push('/list');
  }
  useEffect(async () => {
      const hospitalInfo = await getHospitalInfo();
      if (hospitalInfo) {
        setHospital(hospitalInfo.hospital);
      }
    }, []
  );
  return (
    <div className="App">
      <header className="header-main">
        <div className="title">
          <img src={hospital?.picture || Logo} className="logo"/>
          <span className="title_text" onClick={() => history.push('/')}>
            {hospital?.name || ''}
          </span>

        </div>
        <div className="utils_container">
          {/*<button className="new_button">*/}
          {/*  + New Patient*/}
          {/*</button>*/}
          {/*<img src={Notification} className='notification'/>*/}
        </div>
      </header>
      <Switch>
        <Route path='/users/:id' render={props => <UserDetails {...props} />}>
        </Route>
        <Route path='/list'>
          <TablePage/>
        </Route>
        <Route path='/auth'>
          <Login/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
