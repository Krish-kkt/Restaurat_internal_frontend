import classes from './MainNav.module.css';
import logoImg from '../../img/logo.png';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogoutConfirmationModal from '../UI/LogoutConfirmationModal';
import { Fragment } from 'react/cjs/react.production.min';
import ReactDOM from 'react-dom';
import fetchRequest from '../../hooks/fetchRequest';
import { useDispatch} from 'react-redux';

const MainNav = (props)=>{

    const [logout, setLogout]= useState(false);
    const [logoutModal, setLogoutModal]= useState(false);

    const dispatch=useDispatch();

    const enableLogoutModal = ()=>{setLogoutModal(true)};
    const disableLogoutModal=()=>{setLogoutModal(false)};

    useEffect(()=>{
        if(props.items.length!==0) setLogout(true);
        else setLogout(false);
    },[props.items.length])

    const logoutHandler=async (btnRef)=>{
        dispatch({type: 'spinnerOn'});
        const [resStatus, response]= await fetchRequest('/logoutall/admin', 'POST', {});
        dispatch({type:'spinnerOff'});
        if(response.Error){
            dispatch({type:'notificationOn', msg:response.Error, error: true});
            btnRef.disabled=true;
            setTimeout(() => {
                dispatch({type:'notificationoff'});
                btnRef.disabled=false;
            }, 2000);
        }else{
            dispatch({type:'notificationOn', msg:response.Msg, error: false});
            dispatch({type:'logout'});
            disableLogoutModal();
            setTimeout(() => {
                dispatch({type:'notificationOff'});
            }, 2000);
        }
    }
    

    return (
        <Fragment>
            {logoutModal && ReactDOM.createPortal(<LogoutConfirmationModal onCancel={disableLogoutModal} onLogout={logoutHandler}/>, document.getElementById("popupModal"))}
            <div className={classes.main}>
                <img className={classes['img-logo']} src={logoImg} alt='Logo Img' /> 
                <div className={classes.navbarContent}>
                    {props.items.map((item)=>{
                        return(<div key={item.link} className={classes.content}><NavLink exact={true} activeClassName={classes.activeContent} to={item.link}>{item.title}</NavLink></div>)
                    })}

                    {logout && <div><button onClick={enableLogoutModal} className={classes.logoutBtn}>LOGOUT</button></div>};
                    
                </div>
                
                    
                
            </div>
        </Fragment>
    )
}

export default MainNav;