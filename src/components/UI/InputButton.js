import React from 'react';
import { useState } from 'react';
import classes from './InputButton.module.css'
import { Fragment, useRef, useImperativeHandle } from 'react';
import errorIcon from '../../img/error.png';


// props: inputType, inputPlaceholder, title

const InputButton = React.forwardRef((props, ref)=>{
    
    const inputRef= useRef();
    const [inputClass, setInputClass] = useState(null);
    const [requiredMsgClass, setRequiredMsgClass]= useState(classes.requiredMsg);
    const [errorIconClass, setErrorIconClass] = useState(classes.errorIcon);

    const requiredFieldHandler = ()=>{
        const currInputValue= inputRef.current.value;
        if(currInputValue.trim()===''){
            setRequiredMsgClass(`${classes.requiredMsg} ${classes.activeRequiredMsg}`);
            setErrorIconClass(`${classes.errorIcon} ${classes.activeErrorIcon}`);
            inputRef.current.focus();
            return false;
        }

        return currInputValue;
    }

    useImperativeHandle(ref,()=>{
        return{
            requiredFieldHandler,
        };
    })

    const changeHandler = (e)=>{
        setRequiredMsgClass(`${classes.requiredMsg}`);
        setErrorIconClass(`${classes.errorIcon}`);
        
    }

    const blurHandler = (e)=>{
        if(e.target.value.trim()!==''){
            setInputClass(classes.activeInput);
        }else{
            setInputClass(null);
            e.target.value='';
        }
    }
    
    return(
        <Fragment>
            <div className={classes.title}>{props.title}</div>
            <div className={classes.inputDiv}>
                <input ref={inputRef} type={props.inputType} placeholder={props.inputPlaceholder} className={inputClass} onBlur={blurHandler} onChange={changeHandler}></input>
                <div className={requiredMsgClass}>{props.title} is required!</div>
                <img className={errorIconClass} src={errorIcon} alt='error' />
            </div>
        </Fragment>
        
    );
});

export default InputButton;