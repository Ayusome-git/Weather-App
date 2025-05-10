import axios from "axios"
import { useRef, useState } from "react"
import { WindIcon } from "../components/images/icons/Wind";
import { HumidityIcon } from "../components/images/icons/HumidityIcon";
import { SpeakerIcon } from "../components/images/icons/SpeakIcon";
import { SearchIcon } from "../components/images/icons/SearchIcon";
import { LocationIcon } from "../components/images/icons/LocationIcon";
import { LogoutIcon } from "../components/images/icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function Weather(){
    const navigate= useNavigate();
    const [type, setType] =useState("")
    const [wind,setWind] = useState("");
    const [temp,setTemp] = useState("");
    const [humidity,setHumidity] = useState("");
    const [city,setCity] = useState("");
    const [backgroundImage,setImage] = useState("");
    const[iconCode,SetIconcode]=useState("");
    const inputRef=useRef<any>("");

    useEffect(() => {
        geoLoc();
    }, []);

    async function BgImg(){
        const response =await axios.get(`https://api.unsplash.com/search/photos?query=${sessionStorage.getItem("City")}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`)
        setImage(response.data.results[0].urls.regular)
    }
    function speech(){
        let sentence= "the temprature in " + city + "is "+ temp+" degree celcius"
        let speech = new SpeechSynthesisUtterance(sentence)
        speechSynthesis.speak(speech)
    }

     async function setLocation(){
        sessionStorage.setItem("City",inputRef.current.value)
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${sessionStorage.getItem("City")}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
            BgImg();
            setType(response.data.weather[0].main)
            SetIconcode(response.data.weather[0].icon)
            setWind(response.data.wind.speed);
            setTemp(response.data.main.temp);
            setCity(response.data.name)
            setHumidity(response.data.main.humidity)

            
     }

    async function geoLoc(){
        navigator.geolocation.getCurrentPosition(async(pos)=>{
            const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
            setType(response.data.weather[0].main)
            const iconCode = response.data.weather[0].icon;
            SetIconcode(iconCode);
            setWind(response.data.wind.speed);
            setTemp(response.data.main.temp);
            const c=response.data.name
            setCity(c)
            setHumidity(response.data.main.humidity)
            sessionStorage.setItem("City",c)
            BgImg()
        })
    }
    return(
        <div className="flex h-screen justify-center items-center text-white" style={{
            backgroundImage:backgroundImage ? `url(${backgroundImage})` : "",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            }}>
                <div className="p-10 bg-slate-700 opacity-80 rounded-2xl items-center justify-center">
                <div className="flex items-center justify center gap-3 pl-6">
                <input ref={inputRef} onKeyDown={(e)=>{if(e.key === "Enter") setLocation();}} className="rounded-2xl p-1 pl-2 outline-none w-72 text-gray-500" type="text" placeholder="Search"/>
                <div onClick={setLocation}><SearchIcon/></div>
                <div onClick={speech}>
                    <SpeakerIcon/>
                </div>
                <div className="cursor-pointer" onClick={geoLoc}>
                    <LocationIcon/>
                </div>
                <div className="text-red-500 cursor-pointer" onClick={()=>{
                    navigate("/signup")
                }}>
                    <LogoutIcon />
                </div>
                
                </div>
                <div className="text-center text-4xl pt-4">{city}</div>
                <div className="flex items-center justify-center">
                    <img className="size-40 " src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt="" />
                </div>
                <div className="text-center pb-3 text-4xl">{type}</div>
                <div className="text-center text-3xl">{temp}{"° C"}</div>
                
                
                <div className="text-white flex justify-between pt-10">
                    <div className="pr-4 flex gap-2">
                        <div className="pt-2">
                        <HumidityIcon />
                        </div>
                    <div>
                    <div>{humidity}{" %"}</div>
                    <span>Humidity</span>
                    </div>
                   
                    <div className="text-white flex pl-48 items-center gap-4 justify-between">
                    <WindIcon/>
                    <div>
                    <div>{wind}{" km/h"}</div>
                    <span>Wind Speed</span>
                    </div>
                    
                    </div>
                </div>
                </div>
            </div>
            </div>
    )
}



