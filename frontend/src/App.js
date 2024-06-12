// /frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import IdeaPage from './pages/IdeaPage';
import ProfilePage from './pages/ProfilePage';
import MentorPage from './pages/MentorPage';
import EventPage from './pages/EventPage';
import ResourcePage from './pages/ResourcePage';
import FeedbackPage from './pages/FeedbackPage';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PublicRoute path="/login" component={LoginPage} />
          <PublicRoute path="/signup" component={SignupPage} />
          <PrivateRoute path="/ideas" component={IdeaPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/mentors" component={MentorPage} />
          <PrivateRoute path="/events" component={EventPage} />
          <PrivateRoute path="/resources" component={ResourcePage} />
          <PrivateRoute path="/feedback" component={FeedbackPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
