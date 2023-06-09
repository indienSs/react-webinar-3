import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import CommentWriter from "../comment-writer";
import dateFormat from "../../utils/date-format";
import EnterRequirement from "../enter-requirement";

function Comment({commentData, onAnswer, onChoseComment, exists, chosenComment}) {
  const cn = bem("Comment");

  const formatedDate = dateFormat(commentData.dateCreate);

  return (
    <>
      <div className={cn()}>
        <div className={cn("info")}>
          <p className={cn("user")}>{commentData.author.profile.name}</p>
          <p className={cn("date")}>{formatedDate}</p>
        </div>
        <div className={cn("text")}>
          {commentData.isDeleted ? <p className={cn("deleted")}>Комментарий удален</p> : commentData.text}
        </div>
        <p className={cn("answer")} onClick={() => onChoseComment(commentData._id)}>
          Ответить
        </p>
      </div>
      <CommentWriter
        visible={exists && commentData._id === chosenComment}
        onAnswer={onAnswer}
        chosenComment={chosenComment}
        onChoseComment={onChoseComment}
      />
      <EnterRequirement
        visible={!exists && commentData._id === chosenComment}
        chosenComment={chosenComment}
        onChoseComment={onChoseComment}
      />
    </>
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
  }).isRequired,
  onAnswer: PropTypes.func,
  exists: PropTypes.bool,
  onChoseComment: PropTypes.func,
  chosenComment: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

Comment.defaultProps = {
  onAnswer: () => {},
  onChoseComment: () => {},
  chosenComment: null,
  exists: false,
};

export default memo(Comment);
