

import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";



export function Signup(){
    const usernameRef= useRef<any>("");
    const passwordRef=useRef<any>("");
    const navigate=useNavigate();

    async function signup(){
        const username=usernameRef.current.value;
        const password=passwordRef.current.value;
        const users = JSON.parse(localStorage.getItem("users") || "{}");
        if(users[username]){
            alert("username already exist!!");
            navigate("/signup")
        }
        else{
        users[username] = password
        localStorage.setItem("users",JSON.stringify(users));
        alert("You are signed up!")
        navigate("/signin")
        }
        

    }

    return <div className="h-screen w-screen flex text-center justify-center items-center bg-[url(./components/images/bgimg.jpg)] bg-cover">
        <div className="rounded-2xl min-w-56 p-8 bg-slate-700 opacity-80">
            <div className="pb-2 text-2xl text-white">Signup</div>
                <Input type={"text"} ref={usernameRef} placeholder="Username"/>
                <Input type={"password"} ref={passwordRef} placeholder="Password"/>
                <span className="text-sm text-white">Already have an Account?</span>
                <span className="text-sm underline text-blue-400 cursor-pointer" onClick={()=>{
                    navigate("/signin")
                }}>  Login</span>
                <div className="flex justify-center pt-4">
                <Button variant="login" onClick={signup} text="Signup"/>
                </div>
                
        </div>
    </div>
}