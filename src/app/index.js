import React from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from "./profile";
import Login from "./login";
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const token = window.localStorage.getItem("token");
  
  const select = useSelector(state => ({
    activeModal: state.modals.name,
    loggedIn: state.session.loggedIn,
    userName: state.user.userInfo.name,
  }));
  
  useInit(() => {
    store.actions.session.getUserInfo();
  }, [token, select.userName])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
