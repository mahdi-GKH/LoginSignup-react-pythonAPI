import { render } from "@testing-library/react";
import { useState,useRef } from "react";
import axios from "axios";
export default function Forms(){

    const [status,setStatus] = useState('Login In');

    const name = useRef();
    const email = useRef();
    const password = useRef();

    return (  
        
        <div className="FormSection vh-100 ">
            <div className="row  ">
                <div className="col-12 ">

                    <h1 className="text-white p-5"> {status} </h1>
                    
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center  ">

                <form className="form col-11 col-lg-5">
                    {
                        status === 'Sign Up' ? <div className="input-group ">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-transparent border-0 border-bottom border-warning rounded-0" > <i className="fa fa-user-o text-white fs-1 pe-3"></i> </span>
                        </div>
                        <input type="text" ref={name} className="form-control bg-transparent border-0 border-bottom border-warning rounded-0 shadow-none text-white" placeholder="Name" />
                    </div> : <></>
                    }
                    
                    <div className="input-group my-5">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-transparent border-0 border-bottom border-warning rounded-0" > <i className=" text-white fs-1 pe-3"> @ </i> </span>
                        </div>
                        <input type="email" className="form-control bg-transparent border-0 border-bottom border-warning rounded-0 shadow-none text-white" placeholder="Email" ref={email} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-transparent border-0 border-bottom border-warning rounded-0" > <i className="fa fa-lock text-white fs-1 pe-3"></i> </span>
                        </div>
                        <input type="password" className="form-control bg-transparent border-0 shadow-none border-bottom border-warning rounded-0 text-white " placeholder="Password" ref={password} />
                    </div>
                    
                    <button onClick={submit} className="btn btn-outline-dark col-11 col-md-5 px-5 py-3 fs-3  d-block mx-auto my-5">{status}</button>
                    <span className="me-1 text-white"> Create Account </span> <span id="change_form"  className="text-info" onClick={setStatusfunction}>{status === 'Sign Up'? 'Log in ' : 'Sign Up'}</span>
                </form>

                </div>
            </div>
            
        </div>


      )
    
      async function submit(e){
        e.preventDefault();

        var url = 'http://127.0.0.1:5000/';
        var acc ;



        if(status === 'Sign Up'){
           
            url += 'SignUp/';
            acc = {
                email : email.current.value,
                password : password.current.value,
                name : name.current.value

            }
            
        }else{
            
            url += 'LogIn/';
            acc = {
                email : email.current.value,
                password : password.current.value,
            }  
            
        }

        const r = await axios.post(url,acc);  
        const token = r.data.token;

        if(token){
                localStorage.setItem('token' , token);
                window.location.reload();
        }else{
                alert(r.data)
        }
        
      }

      function setStatusfunction(e){
        e.preventDefault();
        if(status === 'Login In'){
            setStatus('Sign Up');
        }else{
            setStatus('Login In');
        }
      }
}