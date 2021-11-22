import * as React from 'react';
import "./chat.css"
import SendIcon from '@mui/icons-material/Send';
import { ref, set, onValue , get } from "firebase/database";
import { auth, rtdb, } from '../firebase-config';
import uuid from 'react-uuid'

const ChatComponet = () => {
    const user = auth.currentUser
    const uid = uuid()
    const chatRef = ref(rtdb, 'homeChat/' + uid)
    const [message, setMessage] = React.useState('')
    const [data, setData] = React.useState(null)
    const handelChange = (event) => {
        setMessage(event.target.value)
    }
    React.useEffect(() => {
        get(ref(rtdb, `homeChat/`)).then((snapshot) => {
            snapshot.exists() && setData(snapshot.val())
        }).catch((error) => {
            console.error(error);
        });
    }, [])
    onValue(ref(rtdb, 'homeChat/'), (snapshot) => {
        const getdata = snapshot.val();
        (getdata === data) && setData(getdata)
    });
    const onClick = () => {
        const data = {
            username: user.displayName,
            message: message,
            profile_picture: user.photoURL
        }
        set(chatRef, data).then(e => {
            console.log('succes');
        })
    }


    return (
        <div className="chat">
            <div className="chat-box">
                <div className="chat-box-header">
                    ChatBo
                </div>
                <div className="chat-box-body">
                    <div className="chat-box-overlay">
                    </div>
                    <div className="chat-logs">
                        {data&&Object.keys(data).forEach((value) => {
                            <div className="chat-msg self" >
                                <span className="msg-avatar">
                                    <img src={data[value].profile_picture} />
                                </span>
                                <div className="cm-msg-text">{data[value].message}</div>
                            </div>
                        })
                        }

                    </div>
                </div>
                <div className="chat-input-box">
                    <input type="text" id="chat-input" placeholder="Send a message..." onChange={handelChange} />
                    <button type="button" className="chat-submit" id="chat-submit" onClick={() => onClick()}><SendIcon /> </button>
                </div>
            </div>
        </div>
    );
}

export default ChatComponet;
