import classes from './CategoryList.module.css';
import CategoryItem from './CategoryItem';
import { Fragment } from 'react';

const CategoryList = (props)=>{

    return(
        <Fragment>
            <div className={classes.heading}>Ctegories</div>
            <div className={classes.underline}></div>
            {props.categoryList.map((item, index)=> {
                return (<CategoryItem index={index} key={item._id} category={item} dispatchCategories={props.dispatchCategories} categoryList={props.categoryList} dispatchMenus={props.dispatchMenus}/>)
            })} 
        </Fragment>
    )
}

export default CategoryList;