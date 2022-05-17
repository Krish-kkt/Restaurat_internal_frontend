import classes from './CategoryItem.module.css'
import EditButton from '../UI/EditButton';
import { Fragment, useState } from 'react';
import ConfirmationModal from "../UI/ConfirmationModal";
import CategoryEditModal from '../UI/CategoryEditModal';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import fetchRequest from '../../hooks/fetchRequest';

const CategoryItem = (props)=>{

    const dispatch= useDispatch();

    const deleteText=`Are you sure you want to delete category "${props.category.title}" ? All menu items under this category will also get deleted.`

    const [confirmationModal, setConfirmationModal]= useState(false);
    const [categoryEditModal, setCategoryEditModal]= useState(false);

    const enableConfirmationModal=()=>{setConfirmationModal(true)};
    const disableConfirmationModal=()=>{setConfirmationModal(false)};

    const enableCategoryEditModal=()=>{setCategoryEditModal(true)};
    const disableCategoryEditModal=()=>{setCategoryEditModal(false)};

    

    const editHandler= async (ref, button)=>{
        const newCategory=ref.value.trim().toUpperCase();
        if(newCategory===''){
            dispatch({type: 'notificationOn', error: true, msg: 'Category name required!'});
            ref.focus();
            button.disabled=true;
            setTimeout(()=>{
                dispatch({type: 'notificationOff'});
                button.disabled=false;
            },2000);
            return;
        }
        if(props.categoryList.find(category=> category.title===newCategory)){
            dispatch({type: 'notificationOn', error: true, msg: 'Category name already exist!'});
            ref.focus();
            button.disabled=true;
            setTimeout(()=>{
                dispatch({type: 'notificationOff'});
                button.disabled=false;
            },2000);
            return;
        }
        dispatch({type:'spinnerOn'});
        const [resStatus,response]= await fetchRequest('/category', 'PATCH', {title:newCategory, _id:props.category._id});
        dispatch({type:'spinnerOff'})
        if(response.Error){
            dispatch({type: 'notificationOn', error: true, msg: response.Error});
            button.disabled=true;
            setTimeout(()=>{
                button.disabled=false;
            },2000);

        }else{
            dispatch({type:'notificationOn', error: false, msg: response.Msg});
            props.dispatchCategories({type: 'edit',payload:{title: newCategory, _id: props.category._id}});
            setCategoryEditModal(false);
        }
        setTimeout(()=>{
            dispatch({type:'notificationOff'});
        },2000);
    }

    const deleteHandler=async (buttonRef)=>{
        dispatch({type:'spinnerOn'});
        const [resStatus, response]= await fetchRequest('/category', 'DELETE', props.category);
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
            props.dispatchCategories({type:'delete', payload: props.category});
            props.dispatchMenus({type:'categoryDelete', position:props.index});
            // disableConfirmationModal();
            setTimeout(() => {
                dispatch({type:'notificationOff'});
            }, 2000);
        }
    }

    return (
        <Fragment>
            {confirmationModal && ReactDOM.createPortal(<ConfirmationModal deleteText={deleteText} onCancel={disableConfirmationModal} onDelete={deleteHandler} />, document.getElementById("popupModal"))}
            {categoryEditModal && ReactDOM.createPortal(<CategoryEditModal onCancel={disableCategoryEditModal} onEdit={editHandler} category={props.category}/>, document.getElementById("popupModal"))}
            <div className={classes.container}>
                <a href='#'>{props.category.title}</a>
                <EditButton onDelete={enableConfirmationModal} onEdit={enableCategoryEditModal} />
            </div>

        </Fragment>
            
    )
}

export default CategoryItem;