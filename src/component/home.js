import { useRoutes } from "react-router-dom";
import Footer from "./footer";
import { NavBar } from "./header";
import { Profile } from "./profile";
import Zoom from 'react-reveal/Zoom';
import './style.css'

export default function Home({user}){
   let route = useRoutes([
    {  path:'/Profile', element: <Zoom><Profile user= {user}/></Zoom>},
   ])
    return (
        <div className='body'>
            <NavBar user = {user}/>
                {route}
            <Footer/>
        </div>
    )
    
}