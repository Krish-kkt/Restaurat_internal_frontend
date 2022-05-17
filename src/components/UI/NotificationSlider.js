import classes from './NotificationSlider.module.css';
import xMark    from '../../img/x-mark.png';
import checkMark from '../../img/check-mark.png';

const NotificationSlider= (props)=>{
    return(
        
            <div className={`${classes.main} ${classes.show}`}>
                {props.error && <img src={xMark} />}
                {!props.error && <img src={checkMark} />}
                <div className={classes.msg}>{props.msg}</div>
            </div>
        
    )
}

export default NotificationSlider;