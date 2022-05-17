import classes from './LoginButton.module.css';
import { Fragment } from 'react/cjs/react.production.min';
import loginIcon from '../../img/enter.png';

const LoginButton = (props)=>{
    

    return(
        <Fragment>
            <button className={classes.loginButton} onClick={props.onClick}>
                <div className={classes.container}>
                    <div className={classes.login}>Login</div>
                    <img className={classes.loginIcon} src={loginIcon} alt='[]'/>
                </div>
            </button>
        </Fragment>
    )
        


    
}

export default LoginButton;