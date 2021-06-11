import React from 'react';
import './Login.css'
import {Redirect} from "react-router-dom";

import firebase, {signInWithGoogle} from "../utils/firebase";
import {firebaseGoogleAuth, updateAxiosToken} from "../api";
import {userTypes} from "../constants";


export class Login extends React.Component {

  componentDidMount() {
    console.log(this.props);
  }

  googleLogin = async () => {
    const res = await signInWithGoogle();
    if (res) {
      const idTokenFirebase = await firebase.auth().currentUser.getIdToken(true);
      // const googleCredentials = await firebase.auth().GoogleAuthProvider.credential(idToken);
      const apiRes = await firebaseGoogleAuth(idTokenFirebase);
      if (apiRes.userType !== userTypes.STAFF) {
        alert("User not preregistered as staff. Try again");
      } else {
        localStorage.setItem('token', apiRes.authToken);
        localStorage.setItem('email', apiRes.email);
        localStorage.setItem('userId', apiRes.userId);
        updateAxiosToken(apiRes.authToken);
        this.setState({authenticated: true});
      }
    }
  }

  state = {
    email: '',
    password: '',
    authenticated: false
  }

  // login = (e) => {
  //
  //   firebase.auth().signInWithEmailAndPassword(this.state.email , this.state.password).then((res) => {
  //
  //     console.log("user at firebase",res)
  //
  //   }).catch((e)=>{
  //
  //     console.log("error",e)
  //
  //   })
  //
  // }

  passwordOn = (e) => {

    let password = e.target.value;

    this.setState({password});

  }

  emailOn = (e) => {

    let email = e.target.value;

    this.setState({email});

  }

  submitOn = (e) => {

    // this.login(e);

  }


  render() {
    if (this.state.authenticated) {
      return (
        <Redirect to="/list"/>
      )
    }

    return (
      <div className="container">
        <div className="form-box">
          <div className="header-form">
            <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{fontSize: "110px"}}></i>
            </h4>
            <div className="image">
            </div>
          </div>
          <div className="body-form">
            <form>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i class="fa fa-user"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Username"/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i class="fa fa-lock"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Password"/>
              </div>
              <button onClick={this.googleLogin} type="button" className="btn btn-secondary btn-block">LOGIN</button>
              {/*<div className="message">*/}
              {/*  <div><input type="checkbox"/> Remember ME</div>*/}
              {/*  <div><a href="#">Forgot your password</a></div>*/}
              {/*</div>*/}
            </form>
            <div className="social">
              <a onClick={this.googleLogin}><i className="fab fa-google"></i></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



