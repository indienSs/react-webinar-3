import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function CommentWriter({visible, onSendComment, chosenComment, onChoseComment, articleId, hasChild}) {
  const cn = bem("CommentWriter");

  const [commentText, setCommentText] = useState("");

  const changeText = e => {
    setCommentText(e.target.value);
  };

  const onClickSend = _ => {
    console.log(chosenComment)
    if (commentText.trim().length > 0) {
      onSendComment(commentText);
      setCommentText("");
    }
  };

  return (
    <div style={{paddingLeft: !hasChild ? 30 : 0}}>
      <div className={cn(`${visible ? "" : "hidden"}`)}>
        <p className={cn("write")}>{`Новый ${chosenComment ? "ответ" : "комментарий"}`}</p>
        <textarea type="textarea" value={commentText} onChange={changeText} />
        <div className={cn("buttons")}>
          <button onClick={onClickSend}>Отправить</button>
          {chosenComment && <button onClick={() => onChoseComment(null)}>Отмена</button>}
        </div>
      </div>
    </div>
  );
}

CommentWriter.propTypes = {
  visible: PropTypes.bool,
  onSendComment: PropTypes.func,
  onChoseComment: PropTypes.func,
  articleId: PropTypes.string,
  hasChild: PropTypes.bool,
  chosenComment: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

CommentWriter.defaultProps = {
  visible: false,
  chosenComment: null,
  articleId: "",
  hasChild: false,
  onSendComment: () => {},
  onChoseComment: () => {},
};

export default memo(CommentWriter);
