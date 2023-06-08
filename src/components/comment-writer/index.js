import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentWriter({visible, onAnswer}) {
  const cn = bem('CommentWriter');

  const [commentText, setCommentText] = useState("");

  const changeText = (e) => {
    // e.preventDefault();
    setCommentText(e.target.value);
  }

  return (
    <div className={cn(`${visible ? "" : "hidden"}`)}>
      <p>Новый комментарий</p>
      <textarea type="textarea" value={commentText} onChange={changeText}/>
      <button onClick={() => onAnswer(commentText)}>Отправить</button>
    </div>
  )
}

CommentWriter.propTypes = {
  visible: PropTypes.bool,
  onAnswer: PropTypes.func,
};

CommentWriter.defaultProps = {
  visible: false,
  onAnswer: () => {},
}

export default memo(CommentWriter);