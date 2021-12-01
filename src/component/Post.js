import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const Post = ({ post, addLike, like }) => {
    return (
        <div className="post">
            <div className="postBody">
                <img src={post.userPic} className="postPic" alt="user Pic" />
                <div className="postContent">
                    <div className="postHeader">
                        <h2 className="postAuthor" id={post.id}>{post.user}</h2>
                        <span className="publishDate">{post.publishDate}</span>
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
                        <span className="desc"><i className="far fa-comment"></i><span>{post.commentsNumber}</span> Comments</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Post;
