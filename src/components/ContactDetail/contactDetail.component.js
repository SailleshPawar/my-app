import React,{Component} from 'react';
 import Table from '../Common/table';
 import AddContact from './addContact.component';
 import Axios from "axios";
    class Contacts extends AddContact {
        constructor(props)
        {
            super(props);
        this.state = {
                headers:[
                    { Header: 'Name', accessor: 'Name' },
                    { Header: 'Phone Number', accessor: 'Phone' },
                    { Header: 'Email', accessor: 'Email' },
                ],
                records:{}
            }
        }
        
  
        componentDidMount() {
            Axios.get("http://localhost:3001/contacts")
              .then(res => {
                this.setState({
                    records: res.data
                });
              })
              .catch(err => {
                console.log(err);
              });
          }

   render(){
    return ( 

    <React.Fragment>

            <AddContact/>
 
 
<Table
        data={this.state.records}
        columns={this.state.headers}
        defaultPageSize={5}
        noRecordsText="No Contact found"
    />
</React.Fragment>
     );
}
 

}
 

export default Contacts;