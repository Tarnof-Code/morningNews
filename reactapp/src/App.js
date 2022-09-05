import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import ScreenHome from "./ScreenHome";
import ScreenMyArticles from "./ScreenMyArticles";
import ScreenSource from "./ScreenSource";
import ScreenArticlesBySource from "./ScreenArticlesBySource";
import wishList from "./reducers/article.reducer";
import token from "./reducers/token.reducer";
import language from "./reducers/language.reducer";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

const store = createStore(combineReducers({ wishList, token, language }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ScreenHome} />
          <Route exact path="/screenmyarticles" component={ScreenMyArticles} />
          <Route
            exact
            path="/screenarticlesbysource/:id"
            component={ScreenArticlesBySource}
          />
          <Route exact path="/screensource" component={ScreenSource} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
