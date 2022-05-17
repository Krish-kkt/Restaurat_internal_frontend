import MenuIitem from "./MenuItem";
import { Fragment } from "react";
import classes from './MenuList.module.css'
import menuList from '../TempData/menuList';

const MenuList = (props)=>{
    return(
        <Fragment>
            {props.categories.map((category, index)=>{
                if(props.categories.length!==props.menus.length) return;
                return (props.menus[index].length!==0 && (
                    <div key={index} className={classes.container} >
                        <div className={classes.categoryName}>{category.title}</div>
                        <div className={classes.underline}></div>
                        {props.menus[index].map((item)=> {
                            return (<MenuIitem key={item._id} menu={item} menus={props.menus[index]} dispatchMenus={props.dispatchMenus} index={index}/>)
                        })}
                    </div>
                ))
            })}
                
             
        </Fragment>
    )
}

export default MenuList;