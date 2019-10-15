import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import StudentRegister from './components/StudentRegister';
import AdminRegister from './components/AdminRegister';
const AppRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" /> {/* For a future landing page */}
          <Route path="/AdminLogin" component={Login} />
          <Route path="/StudentRegister" component={StudentRegister}/>
          <Route path="/AdminRegister" component={AdminRegister}/>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;