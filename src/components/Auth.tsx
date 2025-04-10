import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export function Auth(){
  const navigate = useNavigate();
  
  useEffect(() => {
    if (sessionStorage.getItem("Username")) {
        navigate("/weather");
    } else {
        navigate("/signin");
    }
  }, [navigate]);
    return <div></div>
}