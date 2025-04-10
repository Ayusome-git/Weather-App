

import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";



export function Login(){
    const usernameRef= useRef<any>("");
    const passwordRef=useRef<any>("");
    const navigate=useNavigate();

    async function login(){
        const username=usernameRef.current.value;
        const password=passwordRef.current.value;
        const users=JSON.parse(localStorage.getItem("users")||"{}");
        try{
            if(users[username] && users[username]===password){
                navigate("/weather")
                sessionStorage.setItem("Username",username)
                alert(`Welcome ${sessionStorage.getItem("Username")}`)

            }
            else{
                alert("invalid credentials!!")
                navigate("/signin")
            }
        }catch(e){
            
        }
        

    }

    return <div className="h-screen w-screen flex text-center justify-center items-center bg-[url(./components/images/bgimg.jpg)]">
    <div className="rounded-2xl  min-w-56 p-8 bg-slate-700 opacity-80">
        <div className="pb-2 text-2xl text-white">Login</div>
            <Input type={"text"} ref={usernameRef} placeholder="Username"/>
            <Input type={"password"} ref={passwordRef} placeholder="Password"/>
            <span className="text-sm text-white">Dont have an Account?</span>
            <span className="text-sm underline text-blue-400 cursor-pointer" onClick={()=>{
                navigate("/signup")
            }}>  SignUp</span>
            <div className="flex justify-center pt-4">
            <Button variant="login" onClick={login} text="Login"/>
            </div>
            
    </div>
</div>
}