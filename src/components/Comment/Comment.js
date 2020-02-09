import React from 'react';
import './Comment.scss'

const Comment = ({authorImage, authorName, commentDate, commentContent}) => {
    return (
        <li className="comment">
            <div className="comment__wrapper">
                <div className="comment__author">
                    <img src={authorImage} alt="author"/>
                    <div className="comment__date__author">
                        <h6 className="author__name">{authorName}</h6>
                        <p className="comment__date">{commentDate}</p>
                    </div>
                </div>
                <div className="comment__content" dangerouslySetInnerHTML={{ __html: commentContent }}></div>
            </div>
        </li>
    )
}
export default Comment