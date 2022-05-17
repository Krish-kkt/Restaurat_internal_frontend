import { useRef, useState, Fragment } from 'react';
import classes from './MenuForm.module.css';
import NotificationSlider from '../components/UI/NotificationSlider';
import ReactDOM from 'react-dom';
import fetchRequest from '../hooks/fetchRequest';
import { useDispatch } from 'react-redux';

const MenuForm = (props)=>{

    const dispatch= useDispatch();

    const titleRef= useRef();
    const priceRef= useRef();
    const categoryRef= useRef();
    const descriptionRef= useRef();
    const addButtonRef= useRef();
    const [msg, setMsg]= useState(null);
    const [error, setError]= useState(true);
    const [notificationSlider, setNotificationSlider] = useState(false);

    // const index=categoryRef.current.options[categoryRef.current.selectedIndex].getAttribute('data-index');

    const notification= (MSG, ERROR)=>{
        setMsg(MSG);
        setError(ERROR);
        setNotificationSlider(true);
        addButtonRef.current.disabled=true;
        setTimeout(()=>{
            setNotificationSlider(false);
            addButtonRef.current.disabled=false;
        },2000);
    }

    const titleValidation=(input, index)=>{
        const val=input.current.value.trim().toUpperCase();
        if(val===''){
            notification('Title required!', true);
            input.current.focus();
            return false;

        }

        if(props.menus[index].find((menu)=> menu.title===val)){
            notification('Title already exist within selected category!', true);
            input.current.focus();
            return false;
        }



        return val;
    }

    const priceValidaton=(input)=>{
        const val=input.current.value.trim();
        if(val===''){
            notification('Price required!', true);
            input.current.focus();
            return false;
        }
        
        if(Number(val)===NaN){
            notification('Price should be a number!', true);
            input.current.focus();
            return false;
        }

        if(Number(val)<=0){
            notification('Price should be greater than 0!', true);
            input.current.focus();
            return false;
        }

        return val;
        
    }

    const categoryValidation=(input)=>{
        const val=input.current.value.trim();
        if(val===''){
            notification('Category required!', true);
            input.current.focus();
            return false;
        }

        return val;
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        const index=categoryRef.current.options[categoryRef.current.selectedIndex].getAttribute('data-index');

        const title= titleValidation(titleRef, index);
        if(!title) return;
        const category= categoryValidation(categoryRef);
        if(!category) return;
        const price= priceValidaton(priceRef);
        if(!price) return;
        const description= descriptionRef.current.value.trim();

        

        const data={title, category, price, description};

        dispatch({type:'spinnerOn'});
        const [resStatus, response]= await fetchRequest('/menu', 'POST', data );
        dispatch({type: 'spinnerOff'});

        if(response.Msg){
            notification(response.Msg, false);
            
            props.dispatchMenus({type:'add', payload: {response: response.Response, position:index}});
        }else{
            notification(response.Error, true);
        }




    }

    return(
        <Fragment>
            {notificationSlider && ReactDOM.createPortal(<NotificationSlider msg={msg} error={error}/>, document.getElementById("notification"))}
            <form onSubmit={submitHandler} className={classes.menuForm} noValidate >
                
                <div className={classes.formFields}>
                    <div className={classes.col1}>
                        <div className={classes.titleField}>
                            <div>Title :</div>
                            <input ref={titleRef} placeholder='Enter menu name' className={classes.titleInput}/>
                        </div>
                        
                        <div className={classes.descriptionField}>
                            <div>Description :</div>
                            <textarea ref={descriptionRef} className={classes.descriptionInput} rows='3'></textarea>
                        </div>
                        
                    </div>
                    <div className={classes.col2}>

                        <div className={classes.categoryField}>
                            <div>Category :</div>
                            <select ref={categoryRef} name='category' className={classes.categoryInput} >
                                {props.categories.map((category, index) =>{
                                    return (<option data-index={index} key={index} value={category.title}>{category.title}</option>)
                                })}
                            </select>
                        </div>
                        
                        <div className={classes.priceField}>
                            <div>Price :</div>
                            <input ref={priceRef} type='number' placeholder='$'  className={classes.priceInput} step='.01' />
                        </div>
                        
                    </div>
                </div>
                <div className={classes.row3}>
                    <button type='button' onClick={props.onCancelHandler}>Cancel</button>
                    <button ref={addButtonRef}>Add</button>
                </div>
                
            </form>
        </Fragment>
        
    )

}

export default MenuForm;