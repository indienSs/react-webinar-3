import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import CommentWriter from "../comment-writer";
import dateFormat from "../../utils/date-format";
import EnterRequirement from "../enter-requirement";

function Comment(props) {
  const cn = bem("Comment");

  const formatedDate = dateFormat(props.commentData.dateCreate);

  return (
    <div style={{paddingLeft: props.commentData.level < 14 ? props.commentData.level * 30 : 390}}>
      <div className={cn()}>
        <div className={cn("info")}>
          <p className={cn(props.userId === props.commentData.author._id ? "chosen-user" : "user")}>{props.commentData.author.profile.name}</p>
          <p className={cn("date")}>{formatedDate}</p>
        </div>
        <div className={cn("text")}>
          {props.commentData.isDeleted ? <p className={cn("deleted")}>Комментарий удален</p> : props.commentData.text}
        </div>
        <p className={cn("answer")} onClick={() => props.onChoseComment(props.commentData._id)}>
          Ответить
        </p>
      </div>
      <CommentWriter
        visible={props.exists && props.commentData._id === props.chosenComment}
        onSendComment={props.onSendComment}
        chosenComment={props.chosenComment}
        onChoseComment={props.onChoseComment}
        articleId={props.articleId}
      />
      <EnterRequirement
        visible={!props.exists && props.commentData._id === props.chosenComment}
        chosenComment={props.chosenComment}
        onChoseComment={props.onChoseComment}
      />
    </div>
  );
}

Comment.propTypes = {
  commentData: PropTypes.shape({
    parent: PropTypes.shape({
      _id: PropTypes.string,
      type: PropTypes.string,
    }),
    author: PropTypes.shape({
      _id: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    isDeleted: PropTypes.bool,
    level: PropTypes.number,
  }).isRequired,
  onSendComment: PropTypes.func,
  exists: PropTypes.bool,
  onChoseComment: PropTypes.func,
  articleId: PropTypes.string,
  userId: PropTypes.string,
  chosenComment: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

Comment.defaultProps = {
  chosenComment: null,
  exists: false,
  articleId: "",
  onSendComment: () => {},
  onChoseComment: () => {},
};

export default memo(Comment);
