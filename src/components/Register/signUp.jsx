import React,{Component} from 'react';
import { Form, Button, Input,FormFeedback,Alert,FormGroup,Label , Col, Row} from 'reactstrap';
import Axios from "axios";
class SignUp extends Component {
    state = {

         data:{
             username:'',
             password:'',
             confirmpassword:''
         },
         errors:{}
      }

      validate=()=>{
        let errors={};
        const {data}=this.state;
        if(data.username==="")errors.username="UserName cannot be blank!";
        if(data.password==="")errors.password="Password cannot be blank!";
        if(data.confirmpassword==="")errors.confirmpassword="Confirm Password cannot be blank!";
        if(data.confirmpassword!==data.password)errors.password="Password doesn't match!";
        return Object.keys(errors).length === 0 ? null : errors;
       //  return errors;
    }


    handleSubmit=(e)=>{
        e.preventDefault();
        const errors = this.validate();
       this.setState({ errors: errors || {} });
       if (errors) return;
        const {data}=this.state;
        console.log(data);

        Axios.post("http://localhost:3001/users",{
            "username": data.username,
            "password": data.password,
            "IsDisable":false,
            "RoleId":2
        }).then((response) => {
            console.log(response);
            const { from } =  { from: { pathname: "/login" } };   
            this.props.history.push(from);
            console.log(response);
        }).catch((err) => {
            if(err.response && err.response.status===400){
                const errors={...this.state.errors};
                errors.username=err.response.data;
            }
           // this.showErrorToaster();
            console.log(err);

        })
    }

    handleChange=({ currentTarget: input })=>{
        const data = this.state.data;
        data[input.name] = input.value;
        this.setState({ data,
            IsValidCrendentials:true,
            errors:{...this.state.errors,[input.name]:''}
        });
     }

    render() { 
        const {errors}=this.state;
        return ( 
        
          
            <Form onSubmit={this.handleSubmit}> 
          <div id="legend">
            <legend className="">Register</legend>
          </div>
          <div className="control-group">
   
          <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <Input id="username" onChange={this.handleChange} name="username" invalid={errors.username?true:false} placeholder="Username"  />
                            <FormFeedback>{errors.username}</FormFeedback>
                        </div>          
          </div>
       
          <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <Input id="password" type="password" onChange={this.handleChange} invalid={errors.password?true:false} name="password" placeholder="Password"  />
                            <FormFeedback>{errors.password}</FormFeedback>
                        </div> 
      
       
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <Input id="confirmpassword" type="password" onChange={this.handleChange} invalid={errors.confirmpassword?true:false} name="confirmpassword" placeholder="Confirm Password"  />
                            <FormFeedback>{errors.confirmpassword}</FormFeedback>
                        </div> 
       
          <div className="control-group">
           
            <div className="controls">
              <button className="btn btn-success">Register</button>
            </div>
          </div>
      </Form>
     );
    }
}
 
export default SignUp;