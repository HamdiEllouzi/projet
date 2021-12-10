import * as React from 'react';
import "./chat.css"
import SendIcon from '@mui/icons-material/Send';
import { ref, onValue, get, push } from "firebase/database";
import { auth, rtdb, } from '../firebase-config';

const ChatComponet = () => {
    const user = auth.currentUser
    const chatRef = ref(rtdb, 'homeChat/')
    const [message, setMessage] = React.useState('')
    const [data, setData] = React.useState(null)
    const [arrayData, setArrayData] = React.useState(null)
    const scrollRef = React.useRef();
    React.useEffect(() => {
        scrollRef.current.scrollIntoView()
        return null
    }, [arrayData]);
    const handelChange = (event) => {
        setMessage(event.target.value)
    }
    const getData = () => {
        const tableOfData = []
        get(ref(rtdb, `homeChat/`)).then((snapshot) => {
            snapshot.exists() && snapshot.forEach(v => {
                tableOfData.push(v.val())
            })
        }).then(e => {
            setArrayData(tableOfData);
        }).catch((error) => {
            console.error(error);
        });
    }
     onValue(ref(rtdb, 'homeChat/'), (snapshot) => {
        const getdata = snapshot.val();
        if (data !== null) {
            if (Object.keys(getdata).length !== Object.keys(data).length) {
                setData(getdata)
                getData()
            }
        } else {
            setData(getdata)
            getData()
        }
        return null
    });

    const onClick = () => {
        const msgData = {
            userId: user.uid,
            username: user.displayName,
            message: message,
            profile_picture: user.photoURL
        }
        push(chatRef, msgData).then(e => {
            console.log('succes');
            setMessage('')
        })
    }
    function handleListKey(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          onClick()
        } 
      }
    return (
        <div className="chat">
            <div className="chat-box">
                <div className="chat-box-header">
                    TChat
                </div>
                <div className="chat-box-body">
                    <div className="chat-box-overlay">
                    </div>
                    <div className="chat-logs" >
                        {(!arrayData) ? <div>loading....</div> : arrayData.map((value, index) =>
                            <div  className={(user.uid === value.userId) ? "chat-msg self" : "chat-msg user"} key={index}>
                                <span className="msg-avatar">
                                    <img src={value.profile_picture} alt='profile img'/>
                                </span>
                                <div className="cm-msg-text">{value.message}</div>
                            </div>)
                        }
                        <div ref={scrollRef}></div>
                    </div>
                </div>
                <div className="chat-input-box">
                    <input type="text" id="chat-input" onKeyDown={handleListKey} value={message} placeholder="Send a message..." onChange={handelChange} />
                    <button type="button" className="chat-submit" id="chat-submit" onClick={() => onClick()}><SendIcon /> </button>
                </div>
            </div>
        </div>
    );
}

export default ChatComponet;
