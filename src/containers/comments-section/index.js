import {memo, useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../components/spinner";
import shallowequal from "shallowequal";
import Comment from "../../components/comment";
import CommentsAmount from "../../components/comments-amount";
import EnterRequirement from "../../components/enter-requirement";
import CommentWriter from "../../components/comment-writer";
import useSelector from "../../hooks/use-selector";
import commentsActions from "../../store-redux/comments/actions";
import listToTree from "../../utils/list-to-tree";

function CommentsSection({articleId}) {

  const dispatch = useDispatch();

  const selectRedux = useSelectorRedux(
    state => ({
      comments: state.comments.data,
      waiting: state.comments.waiting,
      chosenComment: state.comments.chosenComment,
    }),
    shallowequal
  );

  const select = useSelector(state => ({
    exists: state.session.exists,
    userId: state.session.user._id,
  }));

  const commentsList = selectRedux.comments.map(comment => {
    if (comment.parent._id === articleId) {
      return {...comment, parent: null}
    }
    return comment
  })
  const parsedComments = listToTree(commentsList);
  console.log(parsedComments);

  const callbacks = {
    // Выбор комментария для ответа
    choseComment: useCallback(id => {
        dispatch(commentsActions.choseComment(id));
      }, []),
    // Отправка комментария на сервер
    sendComment: useCallback(comment => {
      dispatch(commentsActions.sendComment(comment));
    }, []),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsAmount amount={selectRedux.comments.length} />
      {selectRedux.comments.map(comment => (
        <Comment
          key={comment._id}
          commentData={comment}
          exists={select.exists}
          articleId={articleId}
          chosenComment={selectRedux.chosenComment}
          onChoseComment={callbacks.choseComment}
          onSendComment={callbacks.sendComment}
          userId={select.userId}
        />
      ))}
      <EnterRequirement visible={!select.exists && !selectRedux.chosenComment} />
      <CommentWriter visible={select.exists && !selectRedux.chosenComment} articleId={articleId}/>
    </Spinner>
  );
}

CommentsSection.propTypes = {
  articleId: PropTypes.string.isRequired,
}

export default memo(CommentsSection);
