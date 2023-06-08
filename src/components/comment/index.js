import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CommentWriter from "../comment-writer";

function Comment({commentData, onAnswer}) {

  const cn = bem('Comment');

  const [visibleAnswer, setVisibleAnswer] = useState(false);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formatDate = new Date(commentData.dateCreate).toLocaleString("ru", options).replace(/\s*г\.,/, " в");

  return (
    <div className={cn()}>
      <div className={cn("info")}>
        <p className={cn("user")}>{commentData.author._id}</p>
        <p className={cn("date")}>{formatDate}</p>
      </div>
      <div>
        {commentData.text}
      </div>
      <p className={cn("answer")} onClick={() => setVisibleAnswer(true)}>Ответить</p>
      <CommentWriter visible={visibleAnswer} onAnswer={onAnswer} />
    </div>
  )
}

Comment.propTypes = {
  commentData: PropTypes.shape({
    parent: PropTypes.shape({
      _id: PropTypes.string,
    }),
    author: PropTypes.shape({
      _id: PropTypes.string,
    }),
    dateCreate: PropTypes.string,
    dateUpdate: PropTypes.string,
    text: PropTypes.string,
    isDeleted: PropTypes.bool,
  }).isRequired,
  onAnswer: PropTypes.func,
};

Comment.defaultProps = {
  onAnswer: () => {}
}

export default memo(Comment);
