import {memo, useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import LoginButtons from "../../components/login-buttons";
import SideLayout from "../../components/side-layout";

function Header() {

  const select = useSelector(state => ({
    userName: state.userInfo.name
  }));


  return (
    <SideLayout side='end'>
      <Head />
      <LoginButtons userName={select.userName}/>
    </SideLayout>
  );
}

export default memo(Header);
