import { NavBar } from "./header";
import './style.css'

export default function Home({user}){
    return (
        <div className='body'>
            <NavBar user = {user}/>
        </div>
    )
    
}