import React,{Component} from 'react';
import { Form, Button, Input,FormFeedback,Alert,FormGroup,Label , Col, Row} from 'reactstrap';
 import Table from '../Common/table';
 import Axios from "axios";
class AddContact extends Component {
    state = {
        data:{
          name:"",
          phone:"",
          email:"",
          image:""
        },
        errors:{},
        headers:[
          {
            Header: () => (
              <div
                style={{
                  textAlign:"left"
                }}
              >Name</div>),
              accessor: 'name'
            },

            {
              Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Phone Number</div>),
                accessor: 'phone'
              },

              {
                Header: () => (
                  <div
                    style={{
                      textAlign:"left"
                    }}
                  >Email</div>),
                  accessor: 'email'
                },
                {
                  Header: () => (
                    <div
                      style={{
                        textAlign:"left"
                      }}
                    >Image Url</div>),
                    accessor: 'image'
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
                    <Button  onClick={() => this.handleDelete(row.original)} color="danger">Delete</Button>
                </div>
            )
         }
          
      ],
      records:{}
      }

getInitialState=()=>{
         return {
              name:"",
              phone:"",
              email:"",
              image:""       
           
         }
     }

       

      handleChange=({ currentTarget: input })=>{
        const data = this.state.data;
        data[input.name] = input.value;
        this.setState({ data,
            errors:{...this.state.errors,[input.name]:''}
        });
     }

     handleDelete = contact => {
       const records = this.state.records.filter(m => m.id !== contact.id); 
       Axios.delete(`http://localhost:3001/contacts/${contact.id}`).then(res => {
        this.setState({ records });
      })
      .catch(err => {
        console.log(err);
      });
    };

     componentDidMount() {
      Axios.get(`http://localhost:3001/contacts?userid=${JSON.parse(localStorage.user)[0].id}`)
        .then(res => {
          this.setState({
              records: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    

    validate=()=>{
      let errors={};
      const {data}=this.state;
      if(data.name==="")errors.name="Customer Name cannot be blank!";
      if(data.phone==="")errors.phone="Phone cannot be blank!";
      if(data.email==="")errors.email="Email cannot be blank!";
      if(data.image==="")errors.image="Image Url cannot be blank!";
      return Object.keys(errors).length === 0 ? null : errors;
     //  return errors;
  }

     handleSubmit=(e)=>{
      e.preventDefault();
      const errors = this.validate();
      this.setState({ errors: errors || {} });
      if (errors) return;
      Axios.post("http://localhost:3001/contacts",{
        name: this.state.data.name,
        phone: this.state.data.phone,
        email:this.state.data.email,
        image:this.state.data.image,
        userid:JSON.parse(localStorage.user)[0].id
      }).then(() => {
         
        Axios.get(`http://localhost:3001/contacts/?userid=${JSON.parse(localStorage.user)[0].id}`)
        .then(res => {
          this.setState({
              records: res.data,
              data:this.getInitialState()
          });
        })
        .catch(err => {
          console.log(err);
        });


      
      }).catch(err => {
          
         // this.showErrorToaster();
          console.log(err);

      })
    }


    render() { 
      const {errors}=this.state;
        return ( 
       

          <React.Fragment>
            <Form onSubmit={this.handleSubmit}>
                <h1 className="btn btn-hero btn-lg btn btn-success">Add Contact</h1> 
                <Row form>
                <Col md={6}>
                <FormGroup>
              <Input type="text" value={this.state.data.name} invalid={errors.name?true:false}  autoComplete="off" onChange={this.handleChange} name="name" id="exampleEmail" placeholder="Enter Customer Name" />
              <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
            </Col>
          <Col md={6}>
            <FormGroup>
              <Input type="number" value={this.state.data.phone} invalid={errors.phone?true:false}  autoComplete="off" onChange={this.handleChange} name="phone" id="phone" placeholder="Enter Customer Phone Number" />
              <FormFeedback>{errors.phone}</FormFeedback>
            </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup >
            <Input type="email" value={this.state.data.email} invalid={errors.email?true:false}  autoComplete="off" onChange={this.handleChange} name="email" id="email" placeholder="Enter Customer Email" />
            <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            </Col>
            <Col md={6}>

            <FormGroup >
            <Input type="text" value={this.state.data.image} invalid={errors.image?true:false} autoComplete="off" onChange={this.handleChange} name="image" id="image" placeholder="Enter Image Url" />
            <FormFeedback>{errors.image}</FormFeedback>
            </FormGroup>
            </Col>
            <Col md={12}>
            <Button color="primary">Submit</Button>
            </Col>
            </Row>
          </Form>

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
 
export default AddContact;