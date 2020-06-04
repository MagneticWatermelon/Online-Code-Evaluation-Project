import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Header from "../components/ui/Header";
import theme from "./ui/Theme";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import Courses from "./ui/Courses";
import Students from "./ui/Students";
import CreateCourse from "./ui/CreateCourse";
import Instructors from "./ui/Instructors";
import CreateUser from "./ui/CreateUser";


function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />       
          <Switch>
            <Route
              exact
              path="/courses"
              component={() => (
                <div style={{ height: "600px" }}>
                  <Courses
                    token={props.token}
                    userID={props.userID}
                    style={{ height: "600px" }}
                  />
                </div>
              )}
            />

            <Route
              exact
              path="/students"
              component={() => (
                <div style={{ height: "600px" }}>
                  <Students token={props.token} userID={props.userID} />
                </div>
              )}
            />

            <Route
              exact
              path="/instructors"
              component={() => (
                <div style={{ height: "600px" }}>
                  <Instructors token={props.token} userID={props.userID} />
                </div>
              )}
            />

            <Route
              exact
              path="/createcourse"
              component={() => (
                <div style={{ height: "600px" }}>
                  <CreateCourse
                    token={props.token}
                    userID={props.userID}
                    style={{ height: "600px" }}
                  />
                </div>
              )}
            />

            <Route
              exact
              path="/createuser"
              component={() => (
                <div style={{ height: "600px" }}>
                  <CreateUser token={props.token} userID={props.userID} />
                </div>
              )}
          />
        
          </Switch>
      
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
