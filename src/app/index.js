import React from "react";
import Main from "./main";
import Basket from "./basket";
import About from "./about"
import useSelector from "../store/use-selector";
import {Routes, Route} from "react-router";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:id' element={<About />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
