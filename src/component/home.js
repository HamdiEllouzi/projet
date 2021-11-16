import { logout } from "./service";

export default function Home(){
    return (
        <div>hi
            <button onClick={()=>logout()}>signout</button>
        </div>
    )
    
}