import classes from './MenuEditModal.module.css';
import { useRef } from 'react';

const MenuEditModal=(props)=>{

    const titleRef= useRef();
    const descriptionRef= useRef();
    const priceRef= useRef();
    const editButtonRef= useRef();

    const editHandler=()=>{
        const refs={
            title: titleRef.current,
            description: descriptionRef.current,
            price: priceRef.current,
            editButton: editButtonRef.current
        }

        props.onEdit(refs);
    }

    return(
        <div className={classes.overlay} >
            <div className={classes.container} >
                <div className={classes.titleSection} >
                    <div className={classes.fieldText} >Title:</div>
                    <input ref={titleRef} className={classes.titleInput} type='text' defaultValue={props.menu.title} ></input>
                </div>
                <div className={classes.descriptionSection} >
                    <div className={classes.fieldText} >Description:</div>
                    <textarea ref={descriptionRef} className={classes.descriptionInput} rows='5' defaultValue={props.menu.description} ></textarea>
                </div>
                <div className={classes.priceSection} >
                    <div className={classes.fieldText} >Price:</div>
                    <input ref={priceRef} className={classes.priceInput} defaultValue={props.menu.price} type='number' step='.01'></input>
                </div>
                <div className={classes.buttonContainer}>
                    <button onClick={props.onCancel} className={classes.cancelButton}>Cancel</button>
                    <button ref={editButtonRef} onClick={editHandler} className={classes.editButton} >Edit</button>
                </div>
            </div>
        </div>
    )
}

export default MenuEditModal;