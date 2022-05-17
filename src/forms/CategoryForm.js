import classes from './CategoryForm.module.css'
import { useRef, useState, Fragment } from 'react';
import fetchRequest from '../hooks/fetchRequest';
import { useDispatch } from 'react-redux';

const CategoryForm = (props)=>{ 

    const dispatch=useDispatch();

    const categoryRef=useRef();
    const addButtonRef=useRef();

    const notification= (MSG, ERROR)=>{
        dispatch({type: 'notificationOn', msg: MSG, error: ERROR});
        addButtonRef.current.disabled=true;
        setTimeout(()=>{
            dispatch({type: 'notificationOff'});
            addButtonRef.current.disabled=false;
        },2000);
    }

    const categoryValidation=(input)=>{
        let val=input.current.value.trim().toUpperCase();
        if(val===''){
            notification('Category name is required!', true);
            input.current.focus();
            return false;
        }

        if(props.categoryList.find(category=> category.title===val)){
            notification('Category already exist!', true);
            input.current.focus();
            return false;
        };


        return val;
    }

    const submitHandler = async (e)=>{
        e.preventDefault();

        const category=categoryValidation(categoryRef);
        if(!category) return;

        dispatch({type: 'spinnerOn'});
        const [resStatus, response]= await fetchRequest('/category', 'POST', {title:category});
        dispatch({type: 'spinnerOff'});
        if(response.Error){
            notification(response.Error, true);
        }else{
            notification(response.Msg, false);
            props.dispatchMenus({type:'categoryAdd'});
            props.onAddDispatch({type: 'add', payload: response.Response});
            
            
            categoryRef.current.value='';
        }
        
        
    }

    return (
        <Fragment>
            <form onSubmit={submitHandler}>
                <div className={classes.categoryField}>
                    <div >Category :</div>
                    <input ref={categoryRef} type='text'  placeholder='Enter a new category name' className={classes.categoryInput}/>
                </div>
                <div className={classes.row2}>
                    <button type='button' onClick={props.onCnacelHandler}>Cancel</button>
                    <button ref={addButtonRef}>Add</button>
                </div>
            </form>
        </Fragment>
        
    )
}

export default CategoryForm;