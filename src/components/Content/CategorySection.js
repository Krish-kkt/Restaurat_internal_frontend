import { Fragment, useState, useReducer, useEffect } from "react";
import CategoryForm from "../../forms/CategoryForm";
import AddButton from "../UI/AddButton";
import CategoryList from "./CategoryList";
import classes from './CategorySection.module.css' 




const CategorySection=(props)=>{

    const [categoryForm, setCategoryForm] = useState(false);
    
    const enableCategoryForm=()=>{setCategoryForm(true)};
    const disableCategoryForm=()=>{setCategoryForm(false)};

    return(
        <Fragment>
            {!categoryForm && (<div className={classes.addButton}><AddButton onClickHandler={enableCategoryForm} /></div>)}
            {categoryForm && (<div className={classes.categoryForm}><CategoryForm categoryList={props.categories} onAddDispatch={props.dispatchCategories} onCnacelHandler={disableCategoryForm} dispatchMenus={props.dispatchMenus}/></div>)}
            <CategoryList categoryList={props.categories} dispatchCategories={props.dispatchCategories} dispatchMenus={props.dispatchMenus} />
        </Fragment>
    )
}

export default CategorySection;