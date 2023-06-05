import {memo, useEffect} from "react";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../layouts/page-layout";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import UserPage from "../../components/user-page";
import Header from "../../containers/header";
import {useNavigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function Profile() {

  const {t} = useTranslate();
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate()

  const select = useSelector(state => ({
    userInfo: state.session.userInfo,
    loggedIn: state.session.loggedIn,
    waiting: state.session.waiting,
  }));

  useEffect(() => {
    if (!token && !select.loggedIn && !select.waiting) {
      navigate("/login")
    }
  }, [token, select.loggedIn, select.waiting])

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
