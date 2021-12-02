import React from 'react';
import "./Publication.css"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Post from './Post';
import CloseIcon from '@mui/icons-material/Close';
import uuid from 'react-uuid';
import { auth } from '../firebase-config';
import { deletePost, setPost } from '../service/service';
import { getDocs, collection } from '@firebase/firestore';
import { db } from '../firebase-config';

const Publication = () => {
    /*  const data = [
          {
              id: 1,
              content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
              user: "Richard McClintock",
              userPic: "",
              publishDate: "2 Weeks ago",
              likesNumber: 18,
              commentsNumber: 3,
              comments: [
                  {
                      id: 0,
                      user: "Bonorum Malorum",
                      content: "Many desktop publishing packages and web page editors now use",
                      userPic: "",
                      publishDate: "2 days ago"
                  },
              ]
              likes : [userid,userid,userid]
          },
  
      ];*/
    const [fireData, setFireData] = React.useState([]);
    React.useEffect(() => {
        fetchData()
    }, [])
    const fetchData = _ => {
        const data = []
        getDocs(collection(db, "posts")).then((e) => {
            e.forEach((doc) => {
                data.push(doc.data())
            });
        }).then(() => setFireData(data))
    }
    const [like, setLike] = React.useState(false)
    const [addPublication, setAddPublication] = React.useState(false);
    const addLike = () => {
        setLike(!like)
    }
    const addPost = (content) => {
        let id = uuid()
        const post = {
            id: id,
            content: content,
            user: auth.currentUser.displayName,
            userPic: auth.currentUser.photoURL,
            likesNumber: 0,
            commentsNumber: 0,
            comments: [],
            like:[]
        }
        setPost(post, id).then((e) => {
            fetchData()
        })
    }
    const addComment = () =>{

    }
    const onDeletePost = (id) => {
        deletePost(id).then(() => fetchData())
    }
    const handleModal = _ => setAddPublication(!addPublication)
    return (
        <div className='post_page'>
            <div className='add_container'>
                <button className='add_button' onClick={handleModal}><AddCircleOutlineIcon fontSize='large' /></button>
            </div>
            <div className='post_content'>
                {fireData.map((v, i) => <Post key={i} addComment={addComment} deletePost={onDeletePost} post={v} addLike={addLike} like={like} />)}
            </div>
            {addPublication && <AddPublication title='New Publication' buttonText='Post Publication' close={handleModal} onSubmit={addPost} />}
        </div>
    );
}

export const AddPublication = ({ title,buttonText,close, onSubmit }) => {

    const [content, setContent] = React.useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(content)
        setContent('')
    }
    const handleTextChange = (event) => {
        setContent(event.target.value)
    }
    return (
        <div className='addPublication_contnair'>
            <span className='close' onClick={close}> <CloseIcon /></span>
            <form className="createComment" onSubmit={handleSubmit}>
                <h1 >{title}</h1>
                <textarea
                    type="text"
                    className='input_publication'
                    placeholder="Publication"
                    value={content}
                    onChange={handleTextChange}
                    required />
                <button className='post_button ' type="submit">{buttonText}</button>
            </form>
        </div>
    )
}
export default Publication;
