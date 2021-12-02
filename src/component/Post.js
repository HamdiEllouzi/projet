import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


const Post = ({ deletePost, addComment, post, addLike, like }) => {
    const [showComments, setShowComments] = React.useState(false)
    const [comment , setComment] = React.useState('')
    const handleShowComments = _ => setShowComments(!showComments)
    const handleClick = (event) => {
        event.preventDefault()
        addComment(comment)
        setComment('')
    }
    const handleChange = (event) => setComment(event.target.value)
    const [loading, setLoading] = React.useState(false);
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
                                {like
                                    ? <button className='like_button' onClick={addLike}><ThumbUpIcon /></button>
                                    : <button className='like_button' onClick={addLike}><FavoriteBorderIcon /></button>}
                                <span>{post.likes} </span>
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
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
            }
        </div>

    );
}
const Comment = props =>
    <div className="comment">
        <img src={props.userPic} className="commentPic" alt="user Pic" />
        <div className="commentBody">
            <div className="commentHeader">
                <h3 className="commentAuthor">{props.user}</h3>
                <span className="publishDate">{props.publishDate}</span>
            </div>
            <span className="commentContent">{props.content}</span>
        </div>
    </div>
export default Post;
