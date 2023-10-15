import Forms from './components/LoginSignup';
import Home from './components/home';
import { Route,Routes } from 'react-router-dom';
import './style.css';

const User = ()=>{
    return localStorage.getItem('token');
}


export default function App(){
    const isAuth = User();

    if(isAuth) {
        return(<Home/>)
    }else{
        
        return(<Forms/>)
    }
}