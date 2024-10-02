import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";

export const ChangeProfile = () => {
    const [newUsername, SetNewUsername] = useState("");
    const {setUsername} = useContext(AppContext);
    return (
        <div>
            <input onChange ={ (event) => {SetNewUsername(event.target.value);} }/>
            <button onClick={() => {if(newUsername!=="")setUsername(newUsername);}}> Change Username</button>
        </div>
    );
}