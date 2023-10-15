import { Outlet } from 'react-router-dom';
import Forms from './LoginSignup';


const User = ()=>{
    return localStorage.getItem('token');
}

export default function Auth(){
    const isAuth = User();
    return isAuth ? <Outlet /> : <Forms/>;
}