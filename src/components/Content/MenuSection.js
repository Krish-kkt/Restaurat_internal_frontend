import { Fragment, useState } from "react";
import classes from './MenuSection.module.css'
import AddButton from "../UI/AddButton";
import MenuForm from "../../forms/MenuForm";
import MenuList from "./MenuList";


const MenuSection= (props)=>{

    const [menuForm, setMenuForm] = useState(false);
    
    const enableMenuForm= ()=>{ setMenuForm(true)};
    const disableMenuForm= ()=>{setMenuForm(false)};

    return(
        <Fragment>
            {!menuForm && (<div className={classes.addButton}><AddButton onClickHandler={enableMenuForm} /></div>)}
            {menuForm && (<div className={classes.menuForm}><MenuForm onCancelHandler={disableMenuForm} categories={props.categories} menus={props.menus} dispatchMenus={props.dispatchMenus} /></div>)}
            <MenuList menus={props.menus} categories={props.categories} dispatchMenus={props.dispatchMenus}/>
        </Fragment>
    )

}

export default MenuSection;