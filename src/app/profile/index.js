import {memo} from "react";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../layouts/page-layout";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import UserPage from "../../components/user-page";
import Header from "../../containers/header";
import {Navigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function Profile() {

  const {t} = useTranslate();

  const select = useSelector(state => ({
    userInfo: state.session.userInfo,
    loggedIn: state.session.loggedIn,
    waiting: state.session.waiting,
  }));


  if (!select.loggedIn && !select.waiting) {
    return <Navigate to="/login" />
  }

  return (
    <PageLayout>
      <Header title={t('title')}/>
      <Navigation />
      <Spinner active={select.waiting}>
        <UserPage userInfo={select.userInfo} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
