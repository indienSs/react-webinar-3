import {memo, useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import Spinner from "../../components/spinner";
import shallowequal from "shallowequal";
import Comment from "../../components/comment";
import CommentsAmount from "../../components/comments-amount";
import EnterRequirement from "../../components/enter-requirement";
import CommentWriter from "../../components/comment-writer";
import useSelector from "../../hooks/use-selector";
import commentsActions from "../../store-redux/comments/actions";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import useInit from "../../hooks/use-init";

function CommentsSection() {

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
  }));

  const callbacks = {
    // Выбор комментария для ответа
    choseComment: useCallback(id => {
        dispatch(commentsActions.choseComment(id));
      }, []),
  };

  let commentsTree = listToTree(selectRedux.comments);

  console.log(commentsTree);

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsAmount amount={selectRedux.comments.length} />
      {selectRedux.comments.map(comment => (
        <Comment
          key={comment._id}
          commentData={comment}
          exists={select.exists}
          chosenComment={selectRedux.chosenComment}
          onChoseComment={callbacks.choseComment}
        />
      ))}
      <EnterRequirement visible={!select.exists && !selectRedux.chosenComment} />
      <CommentWriter visible={select.exists && !selectRedux.chosenComment} />
    </Spinner>
  );
}

export default memo(CommentsSection);
