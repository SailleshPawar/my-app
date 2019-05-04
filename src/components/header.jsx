import React,{Component} from 'react';
import { Link,BrowserRoute,withRouter  } from 'react-router-dom';
import { userService } from './service/userService';
import { Form,Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavItem, Button,NavLink, Input,FormFeedback,Alert,FormGroup,Label , Col, Row} from 'reactstrap';

import PropTypes from "prop-types";
 const  headerComponent= ({user}) => {
  console.log(user);
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
   <div className="carousel-inner">
     <div className="item slides active">
       <div className="slide-1"></div>
       <div className="hero">
         <hgroup>
             <h1>We are creative</h1>        
             <h3>Get start your next awesome project</h3>
         </hgroup>
         <div>
        
<FormGroup>
 {
           !user && 
<a href="JavaScript:Void(0);" >Login</a>

}</FormGroup>
<FormGroup>

 </FormGroup>


         {/* <Button  className="btn btn-hero btn-lg" role="button">See all features</Button> */}
       </div>
     </div>
     
   </div> 
 </div>
 </div> 
   )
}
  
 export default headerComponent;

 