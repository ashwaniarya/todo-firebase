import React, { useState } from "react";
import style from "./App.module.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes } from "../route";
import { Modal } from "ui-kit";
import { GobalContext, IModalData } from "store";

const GlobalNavigation = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route?.exact}
            children={route.screen}
          />
        ))}
      </Switch>
    </Router>
  );
};


function App() {
  let initialModalData:IModalData = {
    show: false,
  };
  
  const [modalData, setModalData] = useState(initialModalData);
  return (
    <GobalContext.Provider value={{ setModalData }}>
      <div className={style.App}>
        <Modal show={modalData?.show}>{modalData?.content}</Modal>
        <GlobalNavigation />
      </div>
    </GobalContext.Provider>
  );
}

export default App;
