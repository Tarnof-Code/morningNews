import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { Input, Button } from "antd";

function ScreenHome(props) {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(null);
  const [errorSignIn, setErrorSignIn] = useState(null);

  var handleSubmitSignUp = (signUpUsername, signUpEmail, signUpPassword) => {
    async function addUser() {
      let rawRecUser = await fetch("/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `usernameFromFront=${signUpUsername.signUpUsername}&emailFromFront=${signUpEmail.signUpEmail}&passwordFromFront=${signUpPassword.signUpPassword}`,
      });
      var recUser = await rawRecUser.json();

      if (recUser.result === true) {
        props.tokenStore(recUser.token);
        setIsSignUp(true);
      } else {
        setErrorSignUp(
          <p className="errorMsg">
            Utilisateur déjà existant ou veuillez remplir tous les champs !
          </p>
        );
      }
    }
    addUser();
  };

  var handleSubmitSignIn = (mail, pwd) => {
    async function checkUser() {
      let rawResponse = await fetch("/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `emailFromFront=${mail.signInEmail}&passwordFromFront=${pwd.signInPassword}`,
      });
      let response = await rawResponse.json();

      console.log(response.token);

      if (response.result === true) {
        props.tokenStore(response.token);
        setIsSignIn(true);
      } else {
        setErrorSignIn(
          <p className="errorMsg">
            Utilisateur inexistant, mauvais mot de passe ou champs vides !
          </p>
        );
      }
    }
    checkUser();
  };

  let redirectScreenSource = null;

  if (isSignUp === true || isSignIn === true) {
    redirectScreenSource = <Redirect to="/screensource" />;
  }

  return (
    <div className="Login-page">
      {/* SIGN-IN */}
      <div>
        {errorSignIn}
        <div className="Sign">
          <Input
            className="Login-input"
            placeholder="arthur@lacapsule.com"
            onChange={(e) => setSignInEmail(e.target.value)}
            value={signInEmail}
          />

          <Input.Password
            className="Login-input"
            placeholder="password"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />

          <Button
            onClick={() =>
              handleSubmitSignIn({ signInEmail }, { signInPassword })
            }
            style={{ width: "80px" }}
            type="primary"
          >
            {redirectScreenSource}
            Sign-in
          </Button>
        </div>
      </div>
      {/* SIGN-UP */}
      <div>
        {errorSignUp}
        <div className="Sign">
          <Input
            className="Login-input"
            placeholder="arthur"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <Input
            className="Login-input"
            placeholder="arthur@lacapsule.com"
            onChange={(e) => setSignUpEmail(e.target.value)}
            value={signUpEmail}
          />
          <Input.Password
            className="Login-input"
            placeholder="password"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
          />
          <Button
            onClick={() =>
              handleSubmitSignUp(
                { signUpUsername },
                { signUpEmail },
                { signUpPassword }
              )
            }
            style={{ width: "80px" }}
            type="primary"
          >
            {redirectScreenSource}
            Sign-up
          </Button>
        </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    tokenStore: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}
export default connect(null, mapDispatchToProps)(ScreenHome);
