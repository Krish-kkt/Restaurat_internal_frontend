import {createStore} from 'redux';

const initialState={
    loggedIn:false,
    userType: null,
    navbarContent: [],
    loadingSpinner: false,
    notificationSlider: false,
    notificationError: true,
    notificationMsg: null
}

const adminNavbarContent=[
    {title:'ABOUT', link:'/about'},
    {title:'USERS', link: '/users'},
    {title:'DASHBOARD', link:'/dashboard'},
    {title: 'MENU', link: '/menu'},
    {title:'ORDERS', link:'/orders'}
]

const userNavbarContent=[
    {title:'ABOUT', link:'/about'},
    {title: 'MENU', link: '/menu'},
    {title:'ORDERS', link:'/orders'}
]

const loginReducer = (state=initialState, action)=>{
    if(action.type==='login'){
        if(action.userType==='ADMIN'){
            return {
                loggedIn: true, 
                userType: action.userType, 
                navbarContent:adminNavbarContent, 
                loadingSpinner: state.loadingSpinner,
                notificationSlider: state.notificationSlider,
                notificationError: state.notificationError,
                notificationMsg: state.notificationMsg
            };
        }
        if(action.userType==='USER'){
            return {
                loggedIn: true, 
                userType: action.userType, 
                navbarContent:userNavbarContent, 
                loadingSpinner: state.loadingSpinner,
                notificationSlider: state.notificationSlider,
                notificationError: state.notificationError,
                notificationMsg: state.notificationMsg
            };
        }
    }

    if(action.type==='logout'){
        return initialState;
    }

    if(action.type==='logout'){
        return {
            loggedIn: false, 
            userType: null, 
            navbarContent:[], 
            loadingSpinner: state.loadingSpinner,
            notificationSlider: state.notificationSlider,
            notificationError: state.notificationError,
            notificationMsg: state.notificationMsg
        };
    }

    if(action.type==='spinnerOn'){
        return{
            loggedIn: state.loggedIn, 
            userType: state.userType, 
            navbarContent: state.navbarContent, 
            loadingSpinner: true,
            notificationSlider: state.notificationSlider,
            notificationError: state.notificationError,
            notificationMsg: state.notificationMsg
        }
    }

    if(action.type==='spinnerOff'){
        return{
            loggedIn: state.loggedIn, 
            userType: state.userType, 
            navbarContent: state.navbarContent, 
            loadingSpinner: false,
            notificationSlider: state.notificationSlider,
            notificationError: state.notificationError,
            notificationMsg: state.notificationMsg
        }
    }

    if(action.type==='notificationOn'){
        return{
            loggedIn: state.loggedIn, 
            userType: state.userType, 
            navbarContent: state.navbarContent, 
            loadingSpinner: state.loadingSpinner,
            notificationSlider: true,
            notificationError: action.error,
            notificationMsg: action.msg
        }
    }

    if(action.type==='notificationOff'){
        return{
            loggedIn: state.loggedIn, 
            userType: state.userType, 
            navbarContent: state.navbarContent, 
            loadingSpinner: state.loadingSpinner,
            notificationSlider: false,
            notificationError: action.error,
            notificationMsg: null
        }
    }

    return state;

    
}

const store= createStore(loginReducer);

export default store;