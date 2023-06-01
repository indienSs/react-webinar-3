import {memo, useEffect, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../layouts/page-layout";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import UserPage from "../../components/user-page";
import Header from "../../containers/header";
import {useNavigate} from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    userInfo: state.userInfo.userInfo,
    userName: state.userInfo.userInfo.name,
    message: state.userInfo.error,
  }));

  useEffect(() => {
    if (!select.userName) {
      navigate("/login");
    }
  }, [select.userName]);

  return (
    <PageLayout>
      <Header title="Магазин" />
      <Navigation />
      {/* <Spinner active={select.waiting}> */}
      <UserPage userInfo={select.userInfo} />
      {/* </Spinner> */}
    </PageLayout>
  );
}

export default memo(Profile);
