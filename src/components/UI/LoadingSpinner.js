import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) =>{
    return (
        <div className={classes.overlay}>
            <div className={classes.spinner}></div>
        </div>
    )
}

export default LoadingSpinner;