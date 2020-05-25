import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Routes from './components/layout/Routes';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

axios.defaults.baseURL = 'https://us-east4-internshipplanner.cloudfunctions.net/api';

const token = localStorage.FBidToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default (App);
