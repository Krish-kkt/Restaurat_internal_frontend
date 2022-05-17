import classes from './CategoryEditModal.module.css'
import {useEffect, useRef } from 'react';

const CategoryEditModal = (props)=>{

    const inputRef= useRef();
    const editButtonRef= useRef();

    useEffect(()=>{
        inputRef.current.focus();
    },[])

    const editHandler= ()=>{
        props.onEdit(inputRef.current, editButtonRef.current);
    } 

    return(
        <div className={classes.overlay} >
            <div className={classes.container} >
                <div className={classes.inputSection} >
                    <input ref={inputRef} className={classes.categoryInput} type='text' defaultValue={props.category.title} ></input>
                </div>
                <div className={classes.buttonContainer}>
                    <button onClick={props.onCancel} className={classes.cancelButton}>Cancel</button>
                    <button ref={editButtonRef} onClick={editHandler} className={classes.editButton} >Edit</button>
                </div>
                
            </div>
        </div>
    )
}

export default CategoryEditModal;