import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Landing from './components/layout/Landing';
import Auth from './view/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './view/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import PostContextProvider from './contexts/PostContext';
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
            exact path="/login" 
            render={ props => <Auth {...props} AuthRoute="login"/> } 
            />
            <Route
            exact path="/register" 
            render={ props => <Auth {...props} AuthRoute="register"/> } 
            />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
