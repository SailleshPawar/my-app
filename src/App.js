import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FooterComponent from './components/footer';
import HeaderComponent from './components/header';
import LoginComponent from './components/Login/login';
import SignUp from './components/Register/signUp.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddContact from './components/ContactDetail/addContact.component';
import { PrivateRoute } from './components/PrivateRoute';
import UserList from './components/Admin/userList.component';
import Logout from './components/logout./logout.component';
  class App extends Component {
    state = {
      user:''
    }

    componentWillMount(){
      
      try {
        const user=JSON.parse(localStorage.user)[0];
      this.setState({user});
      } catch (error) {
        this.setState({user:null});
      }
      
    }
   
    render(){
  return (
    <div className="container">
     
      <Router>
      <HeaderComponent user={this.state.user} />
     {/* <div>
     <Route path="/SignUp"  component={SignUp} />
     </div> */}
                            <div>
                                <Route exact path="/Logout" component={Logout}  />
                                <Route exact path="/SignUp" component={SignUp} />
                                <PrivateRoute exact path="/" component={AddContact} />
                                <PrivateRoute exact path="/UserList" component={UserList} />                      
                                <Route path="/login"  component={LoginComponent} />
                                
                            </div>
     
      <FooterComponent/>
                        </Router>
     
    </div>
  );
}
  }
export default App;
