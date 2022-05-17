import classes from './AddButton.module.css'
import { Fragment } from 'react';


const AddButton = (props)=>{
    return(
        <Fragment>
            <button onClick={props.onClickHandler} className={classes.addButton}>Add</button>
        </Fragment>
    )
}

export default AddButton;