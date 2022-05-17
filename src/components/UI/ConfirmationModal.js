import classes from './ConfirmationModal.module.css'
import { useRef } from 'react';

const ConfirmationModal = (props)=>{

    const deleteButtonRef=useRef();

    const deleteHandler=()=>{
        props.onDelete(deleteButtonRef.current);
    }

    return(
        <div className={classes.overlay}>
            <div className={classes.container}>
                <div className={classes.question}>{props.deleteText}</div>
                <div className={classes.buttonContainer}>
                    <button onClick={props.onCancel} className={classes.cancelButton}>Cancel</button>
                    <button ref={deleteButtonRef} onClick={deleteHandler} className={classes.deleteButton} >Delete</button>
                </div>

            </div>

        </div>
    )

}

export default ConfirmationModal;