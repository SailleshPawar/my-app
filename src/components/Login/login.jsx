import React,{Component} from 'react';
import { Form, Button, Input,FormFeedback,Alert } from 'reactstrap';
import Axios from "axios";
import { userService } from '../service/userService';
import ContactDetail from '../ContactDetail/contactDetail.component';

class LoginForm extends Component {
    constructor(props)
    {
        super(props);
        userService.logout();

    this.state = this.getInitialState();
    }

      getInitialState=()=>{
        return {
           data:{username:'',password:''},
           loadContactDetails:false,
           IsValidCrendentials:true,
           ErrorMessage:'',
           errors:{}
        }
    }

    validate=()=>{
        let errors={};
        const {data}=this.state;
        if(data.username==="")errors.username="UserName cannot be blank!";
        if(data.password==="")errors.password="Password cannot be blank!";

        return Object.keys(errors).length === 0 ? null : errors;
       //  return errors;
    }

    handleChange=({ currentTarget: input })=>{
        const data = this.state.data;
        data[input.name] = input.value;
        this.setState({ data,
            IsValidCrendentials:true,
            errors:{...this.state.errors,[input.name]:''}
        });
     }


     loadSignUp=()=>
     {
         console.log("clled");
         debugger;
        const { from } =  { from: { pathname: "/SignUp" } };   
        this.props.history.push(from);
       
     }

     handleSubmit=(e)=>{
        e.preventDefault();
        const errors = this.validate();
       this.setState({ errors: errors || {} });
       if (errors) return;
        const {data}=this.state;
        console.log(data);
        let user=[];
        Axios.get("http://localhost:3001/users").then((response) => {
            console.log(response);
            user = response.data.filter(item=>item.username===this.state.data.username && 
                item.password===this.state.data.password);         
        if(user.length>0 && user[0].RoleId===2 && !user[0].IsDisable){
            const { from } =  { from: { pathname: "/" } };   
            localStorage.setItem('user', JSON.stringify(user));
            this.props.history.push(from);
           this.setState({authenticated: true})
            }
        else if(user.length>0 && user[0].RoleId===1 && !user[0].IsDisable){
            const { from } =  { from: { pathname: "/UserList" } };   
            localStorage.setItem('user', JSON.stringify(user));
            this.props.history.push(from);
           this.setState({authenticated: true})
        }
      
            else
            {
                this.setState({
                    IsValidCrendentials:false,
                    authenticated: false,
                    ErrorMessage: user.length>0?'Your Account has been locked!': 'Invalid UserName and Password!'
                   // loaderHiddenStatus: configs.loaderHideClassName, isApiFailed: true
                });
                console.log('Invalid Crendentials');
            }
            console.log(response);
        }).catch(err => {
            
           // this.showErrorToaster();
            console.log(err);

        })




    
    }
     
    render()
        { 
        
            const { data,errors,IsValidCrendentials,ErrorMessage } = this.state;    
        return ( <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">
                    <h3>Sign In</h3>
                    <div className="d-flex justify-content-end social_icon">
                        <span><i className="fab fa-facebook-square"></i></span>
                        <span><i className="fab fa-google-plus-square"></i></span>
                        <span><i className="fab fa-twitter-square"></i></span>
                    </div>
                </div>
                <div className="card-body">
                <Form onSubmit={this.handleSubmit}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <Input id="username" name="username" placeholder="UserName" onChange={this.handleChange} invalid={errors.username?true:false} value={data.username}/>
                            <FormFeedback>{errors.username}</FormFeedback>
           
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <Input type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} invalid={errors.password?true:false} value={data.password}/>
                            <FormFeedback >{errors.password}</FormFeedback>
           
                        </div>

                        <div>
                        {!IsValidCrendentials &&   <Alert color="danger">
                        {ErrorMessage}
                 </Alert> } </div>


                       
                        <div className="form-group">
                        <Button className="btn float-right login_btn" color="primary">Login</Button>

                        </div>
                        </Form> 
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Don't have an account?<a href="JavaScript:Void(0);" onClick={this.loadSignUp}  >Sign Up</a>
                    </div>
                    <div className="d-flex justify-content-center">
                        <a href="JavaScript:Void(0);">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </div>
    </div> );
    }
}
 
export default LoginForm;