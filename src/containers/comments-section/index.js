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
import treeToList from "../../utils/tree-to-list";
import {useLocation, useNavigate} from "react-router-dom";
import findChildId from "../../utils/find-child";

function CommentsSection({articleId}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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

  const commentsTree = listToTree(selectRedux.comments, item => item.parent._type === "comment");
  const commentsList = treeToList(commentsTree, (comment, level) => ({...comment, level}));
  const parentsComment = listToTree(selectRedux.comments, item => item.parent._id === selectRedux.chosenComment);
  const commentId = findChildId(parentsComment, selectRedux.chosenComment);

  const callbacks = {
    // Выбор комментария для ответа
    choseComment: useCallback(id => {
      dispatch(commentsActions.choseComment(id));
    }, []),
    // Отправка комментария на сервер
    sendComment: useCallback(comment => {
      const commentToSend = {
        text: comment,
        parent: {_id: selectRedux.chosenComment || articleId, _type: selectRedux.chosenComment ? "comment" : "article"},
      };
      dispatch(commentsActions.sendComment(commentToSend));
    }, [selectRedux.chosenComment]),
    onNavigate: useCallback(() => navigate("/login", {state: {back: location.pathname}}), [location.pathname])
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsAmount amount={selectRedux.comments.length} />
      {commentsList.map(comment => (
        <Comment
          key={comment._id}
          commentData={comment}
          exists={select.exists}
          articleId={articleId}
          chosenComment={commentId}
          onChoseComment={callbacks.choseComment}
          onSendComment={callbacks.sendComment}
          userId={select.userId}
          onNavigate={callbacks.onNavigate}
          hasChild={selectRedux.chosenComment !== null && selectRedux.chosenComment !== commentId}
        />
      ))}
      <EnterRequirement visible={!select.exists && !selectRedux.chosenComment} onNavigate={callbacks.onNavigate} hasChild={true}/>
      <CommentWriter
        visible={select.exists && !selectRedux.chosenComment}
        articleId={articleId}
        onSendComment={callbacks.sendComment}
        hasChild={true}
      />
    </Spinner>
  );
}

CommentsSection.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default memo(CommentsSection);
