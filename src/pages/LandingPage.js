import classes from "./LandingPage.module.css"
import Punchline from "../components/Content/PunchLine"
import LoginFormClient from "../forms/LoginFormClient"


const LandingPage = (props) =>{

    

    return(
        
            
            <div className={classes.cover} >
                <div className={classes.punchLine}><Punchline /></div>
                <div className={classes.loginForm}><LoginFormClient /></div>
            </div>
        
    )
}

export default LandingPage;