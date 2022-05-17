import classes from './MenuItem.module.css';
import EditButton from '../UI/EditButton';
import { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import ConfirmationModal from '../UI/ConfirmationModal';
import MenuEditModal from '../UI/MenuEditModal';
import { useDispatch } from 'react-redux';
import fetchRequest from '../../hooks/fetchRequest';

const MenuIitem = (props)=>{

    const dispatch=useDispatch();

    const deleteText=`Are you sure you want to delete item "${props.menu.title}"?`;

    const [confirmationModal, setConfirmationModal]= useState(false);
    const [menuEditModal, setMenuEditModal]= useState(false);

    const enableConfirmationModal=()=>{setConfirmationModal(true)};
    const disableConfirmationModal=()=>{setConfirmationModal(false)};

    const enableMenuEditModal=()=>{setMenuEditModal(true)};
    const disableMenuEditModal=()=>{setMenuEditModal(false)};


    const errorNotification=(MSG, buttonRef, inputRef)=>{
        dispatch({type:'notificationOn', msg:MSG, error: true});
        inputRef.focus();
        buttonRef.disabled=true;
        setTimeout(() => {
            dispatch({type:'notificationOff'});
            buttonRef.disabled=false;
        }, 2000);
    }

    const titleValidation=(titleRef, buttonRef)=>{
        const title=titleRef.value.trim().toUpperCase();
        if(title===''){
            errorNotification('Title required!', buttonRef, titleRef);
            return false;
        }

        if(props.menus.find((menu)=>(menu.title===title && menu._id!==props.menu._id))){
            errorNotification('Title already exist within selected category!', buttonRef, titleRef);
            return false;
        }

        return title;
    }

    const priceValidation=(priceRef, buttonRef)=>{
        const price=priceRef.value.trim();
        if(price===''){
            errorNotification('Price required!', buttonRef, priceRef);
            return false;
        }
        
        if(Number(price)===NaN){
            errorNotification('Price should be a number!', buttonRef, priceRef);
            return false;
        }

        if(Number(price)<=0){
            errorNotification('Price should be greater than 0!', buttonRef, priceRef);
            return false;
            
        }

        return price;
    }

    const editHandler=async (refs)=>{
        const title= titleValidation(refs.title, refs.editButton);
        if(!title) return;

        const price= priceValidation(refs.price, refs.editButton);
        if(!price) return;

        const data={
            title,
            price,
            description: refs.description.value.trim(),
            _id: props.menu._id,
            categoryId: props.menu.categoryId
        }

        dispatch({type: 'spinnerOn'});
        const [resStatus, response]=await fetchRequest('/menu','PATCH', data);
        dispatch({type: 'spinnerOff'});
        if(response.Error){
            errorNotification(response.Error, refs.title, refs.editButton);
        }else{
            props.dispatchMenus({type:'edit', position:props.index, response:response.Response});
            dispatch({type:'notificationOn', msg:response.Msg, error:false});
            disableMenuEditModal();
            setTimeout(()=>{dispatch({type:'notificationOff'})},2000);
        }
    }


    const deleteHandler=async ( buttonRef)=>{
        dispatch({type:'spinnerOn'});
        const [resStatus, response]= await fetchRequest('/menu', 'DELETE', props.menu);
        dispatch({type: 'spinnerOff'});
        if(response.Error){
            dispatch({type:'notificationOn', msg:response.Error, error: true});
            buttonRef.disabled=true;
            setTimeout(() => {
                dispatch({type:'notificationOff'});
                buttonRef.disabled=false;
            }, 2000);
        }else{
            dispatch({type:'notificationOn', msg:response.Msg, error: false});
            props.dispatchMenus({type:'delete', position:props.index, response:props.menu});
            // disableConfirmationModal();
            setTimeout(() => {
                dispatch({type:'notificationOff'});
            }, 2000);
        }
    }

    return(
        <Fragment>
            {confirmationModal && ReactDOM.createPortal(<ConfirmationModal onCancel={disableConfirmationModal} onDelete={deleteHandler} deleteText={deleteText}/>, document.getElementById("popupModal"))}
            {menuEditModal && ReactDOM.createPortal(<MenuEditModal onCancel={disableMenuEditModal} onEdit={editHandler} menu={props.menu} />, document.getElementById("popupModal"))}
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.itemContainer}>
                        <div className={classes.title}>{props.menu.title}</div>
                        <div className={classes.description}>{props.menu.description}</div>
                    </div>
                    <div className={classes.price}>${props.menu.price}</div>
                </div>
                <div className={classes.seperatorContainer}> </div>
                <div className={classes.buttons}>
                    <EditButton onDelete={enableConfirmationModal} onEdit={enableMenuEditModal}  />
                </div>
            </div>
        </Fragment>
        
    )
}

export default MenuIitem;