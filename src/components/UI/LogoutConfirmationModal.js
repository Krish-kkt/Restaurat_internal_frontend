import classes from './LogoutConfirmationModal.module.css'
import { useRef } from 'react';

const LogoutConfirmationModal = (props)=>{

    const logoutButtonRef=useRef();

    const logoutHandler=()=>{
        props.onLogout(logoutButtonRef.current);
    }

    

    return(
        <div className={classes.overlay}>
            <div className={classes.container}>
                <div className={classes.question}>Are you sure you want to logout ?</div>
                <div className={classes.buttonContainer}>
                    <button onClick={props.onCancel} className={classes.cancelButton}>Cancel</button>
                    <button ref={logoutButtonRef} onClick={logoutHandler}  className={classes.logoutButton} >Logout</button>
                </div>

            </div>

        </div>
    )

}

export default LogoutConfirmationModal;