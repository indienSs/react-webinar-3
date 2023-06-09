import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function CommentWriter({visible, onSendComment, chosenComment, onChoseComment, articleId}) {
  const cn = bem("CommentWriter");

  const [commentText, setCommentText] = useState("");

  const changeText = e => {
    setCommentText(e.target.value);
  };

  const onClickSend = e => {
    onSendComment({text: commentText, parent: {_id: chosenComment || articleId, _type: chosenComment ? "comment" : "article"}});
  };

  return (
    <div className={cn(`${visible ? "" : "hidden"}`)}>
      <p>{`Новый ${chosenComment ? "ответ" : "комментарий"}`}</p>
      <textarea type="textarea" value={commentText} onChange={changeText} />
      <div className={cn("buttons")}>
        <button onClick={onClickSend}>Отправить</button>
        {chosenComment && <button onClick={() => onChoseComment(null)}>Отмена</button>}
      </div>
    </div>
  );
}

CommentWriter.propTypes = {
  visible: PropTypes.bool,
  onSendComment: PropTypes.func,
  onChoseComment: PropTypes.func,
  articleId: PropTypes.string,
  chosenComment: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

CommentWriter.defaultProps = {
  visible: false,
  chosenComment: null,
  articleId: "",
  onSendComment: () => {},
  onChoseComment: () => {},
};

export default memo(CommentWriter);
