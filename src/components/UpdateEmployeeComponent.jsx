import React, { Component } from 'react';
import EmployeeService from './services/EmployeeService';

class UpdateEmployeeComponent extends Component {


    constructor(props){
        super(props)
            
            this.state={
                id:this.props.match.params.id,
                firstName:'',
                lastName:'',
                email:'',
                
            }

            this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
            this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
            this.changeEmailHandler=this.changeEmailHandler.bind(this);
            this.updateEmployee=this.updateEmployee.bind(this);
        }
    changeFirstNameHandler=(event)=>{
        this.setState({firstName: event.target.value});
    } 

    changeLastNameHandler=(event)=>{
        this.setState({lastName: event.target.value});
    } 

    changeEmailHandler=(event)=>{
        this.setState({email: event.target.value});
    } 

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res)=>{
            let employee=res.data;

            this.setState({firstName:employee.firstName,
                          lastName:employee.lastName,
                          email:employee.email
            })
        });
    }




    updateEmployee=(e)=>  {
        e.preventDefault();
        let employee={firstName:this.state.firstName,lastName:this.state.lastName,email:this.state.email};
        console.log('Employee=>'+JSON.stringify(employee));
        EmployeeService.updateEmployee(this.state.id,employee).then(res=>{
            this.props.history.push('/employees');
        });
    }

    cancel(){
        this.props.history.push('/employees')
    }
    


    render() {
        return (
            <div>

                <div className='container'>
                    <br></br>
                    <div className="row">
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className="text-center">Update Employee</h3>

                            <div className="card-body">

                                <form>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input placeholder="First Name"className="form-control" name="firstName"
                                             value={this.state.firstName} onChange={this.changeFirstNameHandler}
                                         />
                                    </div>

                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input placeholder="Last Name"className="form-control" name="lastName"
                                             value={this.state.lastName} onChange={this.changeLastNameHandler}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input placeholder="Email Adress"className="form-control" name="email"
                                             value={this.state.email} onChange={this.changeEmailHandler}
                                        />
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>


                                </form>

                            </div>

                        </div>

                    </div>

                </div>
                
            </div>
        );
    }
}

export default UpdateEmployeeComponent;