import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { auth } from '../firebase-config';

const Post = ({ deletePost, addComment, post, addLike }) => {
    const ifLike = post.like.find((v)=> v === auth.currentUser.uid )
    React.useEffect(()=>{
        (ifLike)? setLikeStatus(true) : setLikeStatus(false)
    },[post])
    const [likeStatus, setLikeStatus] = React.useState(false)
    const [showComments, setShowComments] = React.useState(false)
    const [comment, setComment] = React.useState('')
    const handleShowComments = _ => setShowComments(!showComments)
    const handleClick = (event) => {
        event.preventDefault()
        addComment(post.id, comment)
        setComment('')
    }
    const handleChange = (event) => setComment(event.target.value)
    return (
        <div className="commentBox">
            <div className="post">
                <div className="postBody">
                    <img src={post.userPic} className="postPic" alt="user Pic" />
                    <div className="postContent">
                        <div className="postHeader">
                            <h2 className="postAuthor" id={post.id}>{post.user}</h2>
                            <span className="publishDate">{post.publishDate}</span>
                            <span style={{ marginLeft: 'auto' }}><button onClick={() => deletePost(post.id)} style={{ color: 'red' }} className='like_button'><DeleteIcon /></button></span>
                        </div>
                        <span className="postText">{post.content}</span>
                        <div className="postDesc">
                            <span className="desc">
                                {likeStatus
                                    ? <button className='like_button' onClick={()=>addLike(post.id)}><ThumbUpIcon /></button>
                                    : <button className='like_button' onClick={()=>addLike(post.id)}><FavoriteBorderIcon /></button>}
                                <span>{post.likesNumber} </span>
                                Likes
                            </span>
                            <span className="desc"><button className='like_button' onClick={handleShowComments}><ChatBubbleOutlineOutlinedIcon /></button><span>{post.commentsNumber}</span> Comments</span>
                        </div>
                    </div>
                </div>
            </div>
            {showComments &&
                <div>
                    <form className="createComment">
                        <h5 style={{ color: 'white' }}>your comment</h5>
                        <textarea
                            id="comment"
                            type="text"
                            name='comment'
                            placeholder="Comment"
                            value={comment}
                            onChange={handleChange}
                            className='input_comment'
                            required />
                        <button onClick={handleClick} className='btn_comment'>Send</button>
                    </form>
                    {post.comment&&post.comment.map((v,i)=><Comment key={i} commentInfo={v}/>)}
                </div>
            }
        </div>

    );
}


const Comment = ({commentInfo}) =>
    <div className="comment">
        <img src={commentInfo.userPic} className="commentPic" alt="user Pic" />
        <div className="commentBody">
            <div className="commentHeader">
                <h3 className="commentAuthor">{commentInfo.user}</h3>
                <span className="publishDate">{commentInfo.publishDate}</span>
            </div>
            <span className="commentContent">{commentInfo.content}</span>
        </div>
    </div>
export default Post;
