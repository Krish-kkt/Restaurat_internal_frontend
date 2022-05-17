import classes from './MenuPage.module.css';
import CategorySection from "../components/Content/CategorySection";
import MenuSection from "../components/Content/MenuSection";
import React from 'react';
import useInitialRequest from '../hooks/initial-request';
import { useDispatch } from 'react-redux';
import { useReducer, useEffect, useState } from 'react';


const MenuPage = (props)=>{

    const ACTIONS={ADD: 'add', EDIT: 'edit', DELETE: 'delete'};

    const dispatch= useDispatch();


    function categoryReducerFn(state,action){
        if(action.type==='initial'){
            action.payload.reverse();
            state=[...action.payload];
            return state;
        }

        if(action.type===ACTIONS.ADD){
            state=[...action.payload,...state];
            return state;
        }

        if(action.type===ACTIONS.EDIT){
            state= state.map((item)=>{
                if(item._id===action.payload._id){
                    return({
                        title: action.payload.title,
                        _id: action.payload._id
                    })
                }else{
                    return item;
                }
            })
            return state;
        }

        if(action.type===ACTIONS.DELETE){
            state= state.filter(item=> item._id!==action.payload._id);
            return state;
        }


    }

    function menuReducerFn(state, action){
        if(action.type==='initial'){
            action.payload.reverse();
            state=action.payload;
            return state;
        }

        
        if(action.type==='add'){
            state=state.map((item, index)=>{
                if(index===Number(action.payload.position)){
                    return [action.payload.response,...item];
                }else{
                    return item;
                }
            })
            return state;
        }

        if(action.type==='categoryAdd'){
            state=[[],...state];
            return state;
        }

        if(action.type==='edit'){
            
            state=state.map((items, index)=>{
                if(index===Number(action.position)){
                    return (items.map((item)=>{
                        if(item._id===action.response._id){
                            return action.response;
                        }else{
                            return item;
                        }
                    }))
                }else{
                    return items;
                }
            })
            return state;
        }

        if(action.type==='delete'){
            state=state.map((items,index)=>{
                if(index===Number(action.position)){
                    return(items.filter((item)=>item._id!==action.response._id));
                }else{
                    return items;
                }
            })

            return state;
        }

        if(action.type==='categoryDelete'){
            state=state.filter((item, index)=> index!==action.position);
            return state;
        }

    }

    const [categories, dispatchCategories]= useReducer(categoryReducerFn,[]);
    const [menus, dispatchMenus]= useReducer(menuReducerFn,[]);
    

    const [categoryResStatus, categoryResponse]= useInitialRequest('/category');
    const [menuResStatus, menuResponse]= useInitialRequest('/menu');
    const [flag, setFlag]= useState(true);

    useEffect(()=>{dispatch({type: 'spinnerOn'})},[]);

    useEffect(()=>{
        if(categoryResponse && menuResponse && flag){
            dispatch({type: 'spinnerOff'});
            if(categoryResponse.Error || menuResponse.Error){
                dispatch({type:'notificationOn', error: true, msg:categoryResponse.Error});
                setTimeout(()=>{
                    dispatch({type: 'notificationOff'})
                }, 3000 );
            }else{
                dispatchCategories({type: 'initial', payload: categoryResponse});
                dispatchMenus({type: 'initial', payload: menuResponse});
            }

            setFlag(false);
        }
    }, [categoryResponse, menuResponse]);


    

    return (
        <div>
            <div className={classes.header}>
                Our Menu
            </div>
            <div className={classes.editableSection}>
                <div className={classes.categoryList}>
                    <CategorySection categories={categories} dispatchCategories={dispatchCategories} dispatchMenus={dispatchMenus}/>
                </div>
                <div className={classes.menuList}>
                    <MenuSection categories={categories} menus={menus} dispatchMenus={dispatchMenus} />
                </div>
            </div>
            
        </div>
        
    )
}

export default React.memo(MenuPage);