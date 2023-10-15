import axios from "axios"
import { useEffect,useState } from "react"


export default function Home(){


    const [name,SetName] = useState()
    
    useEffect(async () => {
     
            const data = await axios.get(`http://127.0.0.1:5000/username/${localStorage.getItem('token')}`);

            data.data.name !== 'False' ? SetName(data.data.name) : SetName(false)
        
    },[]);
    
    return (  
        
        <>
            <h1>Welcome {name !== false ? <span> {name} <button onClick={logout} className="btn btn-danger"> <i className="fa fa-sign-out"></i> </button> </span> : logout()} </h1>
        </>


      )
    function logout(){
        localStorage.clear();
        alert('log out !!!!')
        window.location.reload()

    }
}