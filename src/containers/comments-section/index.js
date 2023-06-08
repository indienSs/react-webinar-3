import {memo, useCallback} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import {useSelector as useSelectorRedux} from "react-redux";
import Spinner from "../../components/spinner";
import shallowequal from "shallowequal";
import Comment from "../../components/comment";
import CommentsAmount from "../../components/comments-amount";
import EnterRequirement from "../../components/enter-requirement";
import CommentWriter from "../../components/comment-writer";
import SideLayout from "../../components/side-layout";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function CommentsSection() {

  const store = useStore();
  const selectRedux = useSelectorRedux(
    state => ({
      comments: state.comments.data,
      waiting: state.comments.waiting,
    }),
    shallowequal
  );

  const select = useSelector(state => ({
    exists: state.session.exists,
  }))

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate("/login", {state: {back: location.pathname}});
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.actions.session.signOut();
    }, []),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsAmount amount={selectRedux.comments.length} />
      {selectRedux.comments.map(comment => (
        <Comment key={comment._id} commentData={comment} />
      ))}
      <EnterRequirement visible={!select.exists}/>
      <SideLayout padding='big'>
        <CommentWriter visible={select.exists} />
      </SideLayout>
    </Spinner>
  );
}

export default memo(CommentsSection);
