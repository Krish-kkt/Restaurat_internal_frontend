import InputButton from "../components/UI/InputButton"
import classes from './LoginFormClient.module.css'
import LoginButton from "../components/UI/LoginButton"
import { Fragment,  useRef } from "react"
import BASE_URL from "../BASE_URL"
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { useState } from "react"
import ReactDOM from 'react-dom'
import { useDispatch } from "react-redux"
import NotificationSlider from "../components/UI/NotificationSlider"




const LoginFormClient = (props) =>{

    const corpIdInputRef = useRef();
    const passwordInputRef = useRef();
    const [loadingSpinner, setLoadingSpinner]= useState(false);
    const [notificationSlider, setNotificationSlider]= useState(false);
    const [msg, setMsg]= useState(null);
    const dispatch= useDispatch();


    const loginHandler = async ()=>{
        const passwordValidation=passwordInputRef.current.requiredFieldHandler();
        const corpIdValidation=corpIdInputRef.current.requiredFieldHandler();
        

        if(passwordValidation && corpIdValidation){

            const data={
                userCode: corpIdValidation,
                password: passwordValidation
            }

            const options={
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
    
            }


            setLoadingSpinner(true);
            try{
                let response= await fetch(`${BASE_URL}/login/admin`, options);
                const statusCode=response.status;
                if(statusCode===200){
                    response= await response.json();
                    dispatch({type: 'login', userType: response.userType })
                }else{
                    response= await response.json();
                    console.log(response);
                    setMsg(response.Error);
                    setNotificationSlider(true);
                    setLoadingSpinner(false);
                    setTimeout(()=>{setNotificationSlider(false)},3000);

                }
    
            }catch(e){
                console.log(e.message);
                setMsg('Server down! Try after sometimes.');
                setNotificationSlider(true);
                setLoadingSpinner(false);
                setTimeout(()=>{setNotificationSlider(false)},3000);
            }

            
        }
        
    }

    return(
        <Fragment>
            {loadingSpinner && ReactDOM.createPortal(<LoadingSpinner/>, document.getElementById("loader"))}
            {notificationSlider && ReactDOM.createPortal(<NotificationSlider msg={msg} error={true}/>, document.getElementById("notification"))}
            <div className={classes.container}>
                <InputButton ref={corpIdInputRef} title="Corp Id" inputType="text" inputPlaceholder="Enter Corp Id"/>
            </div>
            <div className={classes.container}>
                <InputButton ref={passwordInputRef} title="Password" inputType="password" inputPlaceholder="Enter Password"/>  
            </div>
            <div >
                <LoginButton onClick={loginHandler} />
            </div>
            
        </Fragment>
        
    )
}

export default LoginFormClient;