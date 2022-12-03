/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import './App.css';
import Header from './components/Header';
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './features/Auth/components/Register';
import Login from './features/Auth/components/Login';

import { useSelector } from 'react-redux';
import UpdateUserProfile from './features/User/components/UpdateUserProfile';
import GroupFeature from './features/Group';
import InviteGroup from './features/InviteGroup';
import PresentationList from './features/Presentation/components/PresentationList';
import PresentationFeature from './features/Presentation';


function App() {
  const loggedInUser = useSelector(state => state.user.current)
  const isLoginIn = !!loggedInUser._id;

  if (isLoginIn) {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/present/*" element={<PresentationFeature/>} /> 
          <Route path="/groups/*" element={<GroupFeature/>} /> 
          <Route path="/invite/:groupId" element={<InviteGroup/>} /> 
          <Route path="/" element={<Navigate to="/groups"/>} /> 
          <Route path="/profile" element={<UpdateUserProfile/>} /> 
          <Route path="/login" element={<Navigate to="/"/>} /> 
          <Route path="/register" element={<Navigate to="/"/>} /> 
        </Routes>
      </div>
    );
  }

  if (!isLoginIn) {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login/>} /> 
          <Route path="/register" element={<Register/>} /> 
          <Route path="*" element={<Navigate to="/login"/>} /> 
        </Routes>
      </div>
    );
  }
  
}

export default App;
