
import { Redirect, Route , Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LoadingSpinner from "./components/UI/LoadingSpinner";
import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import NotificationSlider from './components/UI/NotificationSlider';
import MainNav from "./components/Navbar/MainNav";

import useInitialRequest from "./hooks/initial-request"; 

function App() {

  const loadingSpinner= useSelector(state=> state.loadingSpinner);
  const notificationSlider= useSelector(state=> state.notificationSlider);
  const msg= useSelector(state=> state.notificationMsg);
  const error= useSelector(state=> state.notificationError);

  const [flag, setFlag]= useState(true);
  const loggedIn= useSelector(state=> state.loggedIn);
  const navbarContent= useSelector(state=>state.navbarContent);
  const dispatch = useDispatch();

  if(flag) dispatch({type:'spinnerOn'});

 

  const [resStatus, response]= useInitialRequest('/admin/live');

  if(response && flag){
    dispatch({type: 'spinnerOff'});
    if(response.Error && !resStatus){
      dispatch({type: 'notificationOn', error: true, msg: response.Error})
      setTimeout(()=>{
        dispatch({type: 'notificationOff'});
      },3000)
    }else if(response.userType){
      dispatch({type:'login', userType: response.userType});
    }

    setFlag(false);
  }

  
  return (
    <Fragment>
      {loadingSpinner && ReactDOM.createPortal(<LoadingSpinner/>, document.getElementById("loader"))}
      {notificationSlider && ReactDOM.createPortal(<NotificationSlider msg={msg} error={error}/>, document.getElementById("notification"))}
      {!flag && 
      <div>
        <MainNav items={navbarContent} />
        <Switch>
          <Route path="/" exact>
            {(loggedIn && <Redirect to="/menu" />)}
            {(!loggedIn && <LandingPage />)}
          </Route>
          <Route path="/menu" exact={true}>
            {!loggedIn && <Redirect to="/" /> }
            {(loggedIn && <MenuPage />)}
          </Route>
        </Switch>
      </div>}
    </Fragment>
  );
}

export default App;
