import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentWriter({visible, onAnswer, chosenComment, onChoseComment}) {
  const cn = bem('CommentWriter');

  const [commentText, setCommentText] = useState("");

  const changeText = (e) => {
    setCommentText(e.target.value);
  }

  return (
    <div className={cn(`${visible ? "" : "hidden"}`)}>
      <p>{`Новый ${chosenComment ? "ответ" : "комментарий"}`}</p>
      <textarea type="textarea" value={commentText} onChange={changeText}/>
      <div className={cn("buttons")}>
        <button onClick={() => onAnswer(commentText)}>Отправить</button>
        {chosenComment && <button onClick={() => onChoseComment(null)}>Отмена</button>}
      </div>
    </div>
  )
}

CommentWriter.propTypes = {
  visible: PropTypes.bool,
  onAnswer: PropTypes.func,
  onChoseComment: PropTypes.func,
  chosenComment: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]), 
};

CommentWriter.defaultProps = {
  visible: false,
  chosenComment: null,
  onAnswer: () => {},
  onChoseComment: () => {},
}

export default memo(CommentWriter);