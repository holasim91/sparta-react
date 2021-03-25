import React from "react";
import { Route, Switch } from "react-router";
import AddPlan from "./AddPlan";
import 'antd/dist/antd.css';
import MyCalandar from "./MyCalendar";
function App() {
  return (
    <div
      className="App"
      style={{ width: "1080px", height: "1000px", margin: "0 auto" }}
    >
      <Switch>
           <Route path='/' exact component={MyCalandar} />
           <Route path='/add' component={AddPlan} />
         </Switch>

    </div>
  );
}

export default App;
