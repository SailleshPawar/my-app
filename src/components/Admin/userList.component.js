import React,{Component} from 'react';
import Table from '../Common/table';
import Axios from "axios";
import { Form, Button, Input,FormFeedback,Alert,FormGroup,Label , Col, Row} from 'reactstrap';
 
class Admin extends Component {
    state = {
        headers:[
          {
            Header: () => (
              <div
                style={{
                  textAlign:"left"
                }}
              >User Name</div>),
              accessor: 'username'
            },

            {
              Header: () => (
                  
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Role Name</div>
                ),

                Cell: row => (
                    <div>
                      {row.original.RoleId===1?"Administrator":"User"} 
                    </div>
                )
              
              
            },
            {
                Header: () => (
                  <div
                    style={{
                      textAlign:"left"
                    }}
                  ></div>),
                Cell: row => (
                    <div>
                      {row.original.IsDisable? <Button   onClick={
                          () => 
                          {
                            this.enableUser(row.original);
                                       
                         }
                      
                    } color="success">Enable</Button>: <Button  onClick={
                        () =>  {
                            this.disableUser(row.original);
 
                        }
                        } color="danger">Disable</Button>  } 
                    </div>
                )
             }
          
      ],
      records:{}
      }


       disableUser(user){
        Axios.put(`http://localhost:3001/users/${user.id}`,{
            "username":user.username,
            "password": user.password,
            "RoleId":user.RoleId,
            "IsDisable":true
        }).then((response) => {
            console.log(response);
            this.LoadUsers();
        }).catch(err => {
            
           // this.showErrorToaster();
            console.log(err);
    
        })
    }
    
       enableUser(user,callback){

          Axios.put(`http://localhost:3001/users/${user.id}`,{
            "username": user.username,
            "password": user.password,
            "RoleId":user.RoleId,
            "IsDisable":false
        }).then((response) => {
            this.LoadUsers();
            console.log(response);
        }).catch(err => {
            this.LoadUsers();
           // this.showErrorToaster();
            console.log(err);
    
        })
      }

      LoadUsers=()=>{
          debugger;
        Axios.get(`http://localhost:3001/users`)
        .then(res => {
          this.setState({
              records: res.data,
          });
        })
        .catch(err => {
          console.log(err);
        });
      }

    

      componentDidMount(){
        this.LoadUsers();
      }
      
    render() { 
        return ( 
            <React.Fragment>
     <h1>User List</h1>
     <Table
     data={this.state.records}
     columns={this.state.headers}
     defaultPageSize={10}
     noRecordsText="No Contact found"
             />
   </React.Fragment>
         );
    }
}
 
export default Admin;