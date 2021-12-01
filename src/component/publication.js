import React from 'react';
import "./Publication.css"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Post from './Post';
import CloseIcon from '@mui/icons-material/Close';
import uuid from 'react-uuid';
import { auth } from '../firebase-config';
const Publication = () => {
    const data = [
        {
            id: 1,
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
            user: "Richard McClintock",
            userPic: "",
            publishDate: "2 Weeks ago",
            likes: 18,
            commentsNumber: 3,
            comments: [
                {
                    id: 0,
                    user: "Bonorum Malorum",
                    content: "Many desktop publishing packages and web page editors now use",
                    userPic: "",
                    publishDate: "2 days ago"
                },
                {
                    id: 1,
                    user: "Cicero Areals",
                    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
                    userPic: "",
                    publishDate: "4 days ago"
                },
                {
                    id: 2,
                    user: "Hanna Pages",
                    content: "Lorem Ipsum comes from sectionsof de Finibus Bonorum et Malorum (The Extremes of Good and Evil)",
                    userPic: "",
                    publishDate: "1 Week ago"
                },
            ]
        },

    ];
    const [fakeData, setFakeData] = React.useState(data);
    const [like, setLike] = React.useState(false)
    const [addPublication, setAddPublication] = React.useState(false);
    const addLike = () => {
        console.log('like');
        setLike(!like)
    }
    const addPost = (content) => {
        let id = uuid()
        const post = {
            id: id,
            content: content,
            user: auth.currentUser.displayName,
            userPic: auth.currentUser.photoURL,
            likes: 0,
            commentsNumber: 0,
        }
        setFakeData([...fakeData , post])
    }

    const handleModal = _ => setAddPublication(!addPublication)
    return (
        <div className='post_page'>
            <div className='add_container'>
                <button className='add_button' onClick={handleModal}><AddCircleOutlineIcon fontSize='large' /></button>
            </div>
            <div className='post_content'>
                {fakeData.map((v, i) => <Post key={i} post={v} addLike={addLike} like={like} />)}
            </div>
            {addPublication && <AddPublication close={handleModal} addPost={addPost} />}
        </div>
    );
}

const AddPublication = ({ close, addPost }) => {
    const [content, setContent] = React.useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        addPost(content)
        setContent('')
    }
    const handleTextChange = (event) => {
        setContent(event.target.value)
    }
    return (
        <div className='addPublication_contnair'>
            <span className='close' onClick={close}> <CloseIcon /></span>
            <form className="createComment" onSubmit={handleSubmit}>
                <h1 >Your Comment</h1>
                <textarea
                    id="comment"
                    type="text"
                    placeholder="Comment"
                    value={content}
                    onChange={handleTextChange}
                    required />
                <button className='post_button ' type="submit">Post Comment</button>
            </form>
        </div>
    )
}
export default Publication;
