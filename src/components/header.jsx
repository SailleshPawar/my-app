import React,{Component} from 'react';
import { Link,BrowserRoute,withRouter  } from 'react-router-dom';
import { userService } from './service/userService';
import { Form,Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavItem, Button,NavLink, Input,FormFeedback,Alert,FormGroup,Label , Col, Row} from 'reactstrap';

import PropTypes from "prop-types";
 class  headerComponent extends Component {
  state = {
    user:''
  }

componentDidMount(){
  try {
    const user=JSON.parse(localStorage.user)[0];
  this.setState({user});
  } catch (error) {
    this.setState({user:null});
  }
}

  
 

  render(){

    const {user}=this.state;
   return ( 

    

   <div className="carousel fade-carousel slide" data-ride="carousel" data-interval="4000" id="bs-carousel"> 
   <div className="overlay">
   <Navbar color="light" light expand="md">
    <NavbarBrand href="/">Contact Manager</NavbarBrand>
    <Collapse navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
{
  user && 

  <NavLink href="/Logout/">Logout</NavLink>
}
        </NavItem>
        <NavItem>
{
  !user && 

  <NavLink href="/Login/">Login</NavLink>
}
        </NavItem>



        <NavItem>
{
  user && user.username
}
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
   </div>
   <ol className="carousel-indicators">
     <li data-target="#bs-carousel" data-slide-to="0" className="active"></li>
     <li data-target="#bs-carousel" data-slide-to="1"></li>
     <li data-target="#bs-carousel" data-slide-to="2"></li>
   </ol>
   
    
      
 </div> 
   )
}
 }
  
 export default headerComponent;

 