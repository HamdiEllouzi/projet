import { useEffect, useState } from "react";
import "./chat.css";
import SendIcon from "@mui/icons-material/Send";
import Conversation from "./Conversation";
import Messages from "./Messages";
import ChatOnline from "./ChatOnline";
import { getConversation, getMessages } from "../service/service";
const ChatComponet = () => {
  const curentUser = JSON.parse(localStorage.getItem("User"));
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState("");
  //const scrollRef = React.useRef();

  useEffect(() => {
    //scrollRef.current.scrollIntoView();
    getConversation(curentUser._id)
      .then((conver) => {
        setConversation(conver);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [curentUser._id]);

  useEffect(() => {
    //scrollRef.current.scrollIntoView();
    getMessages(currentChat?._id)
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentChat?._id]);

  const handelChange = (event) => {};

  const getData = () => {
    const tableOfData = [];
  };

  const onClick = () => {};

  function handleListKey(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onClick();
    }
  }
  return (
    <div className='messanger'>
      <div className='chat-box-header'>TChat</div>
      <div className='chat-box-body'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input className='chatMenuInput' placeholder='Search for freinds' />
            {conversation.map((v, i) => (
              <div key={i} onClick={() => setCurrentChat(v)}>
                <Conversation conversation={v} curentUser={curentUser} />
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatboxWrapper'>
            <div className='chat-logs'>
              {currentChat ? (
                <>
                  <Messages />
                  <Messages user={true} />
                  <Messages />
                  <Messages user={true} />
                  <Messages />
                  <Messages user={true} />
                  <Messages user={true} />
                </>
              ) : (
                <span className='noConversationText'>Open a conversation to start a chat.</span>
              )}
            </div>
            <div className='chat-input-box'>
              <input
                id='chat-input'
                onKeyDown={handleListKey}
                value={message}
                placeholder='Send a message...'
                onChange={handelChange}
              />
              <button type='button' className='chat-submit' id='chat-submit' onClick={() => onClick()}>
                <SendIcon />{" "}
              </button>
            </div>
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponet;
