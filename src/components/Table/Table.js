import React from 'react';
import './table.css';

class Table extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            id: '',
            tablelist2: []
        }
    }


    renderTableData(){
        return this.state.tablelist2.map((user, index) => {
            const { id, name, mobile, email, address } = user //destructuring
            return (
               <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{mobile}</td>
                  <td>{email}</td>
                  <td>{address}</td>
               </tr>
            )
         })
    }

    onValueChange = (event) => {
		this.setState({id: event.target.value});
	}
    clearForm = () => {
        document.getElementById('delete').reset();
    }
    // userAuthenticated = () => {
	// 	fetch('https://stark-stream-43344.herokuapp.com/isUserAuth', {
	// 		method: 'GET',
	// 		headers: {'x-access-token': localStorage.getItem('token')},
	// 	})
	// 		.then(response => response.json())
	// 		.then(response => {
	// 			console.log(response)
	// 			return true;
	// 		})
    //         .catch(e => console.log(e))
    //     return false; 
	// }

    Delete = () => {
        let valid = false;
		fetch('https://stark-stream-43344.herokuapp.com/isUserAuth', {
			method: 'GET',
			headers: {'x-access-token': localStorage.getItem('token')},
		})
			.then(response => response.json())
			.then(response => {
				//console.log("userAuthenticated worked lol")
				if(response.auth){
					valid = true;
                fetch('https://stark-stream-43344.herokuapp.com/deldata', {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.id,
                    })
                })
                    .then(response => response.json())
                    .then(user => {alert(user + ": Click Refresh Button to fetch updated database");})
                    .catch(e => {console.log(e);})
                } else {
                    alert("session expired please login again!");
                }
            })
        this.clearForm();
    }

    Refresh = () => {
        let valid = false;
		fetch('https://stark-stream-43344.herokuapp.com/isUserAuth', {
			method: 'GET',
			headers: {'x-access-token': localStorage.getItem('token')},
		})
			.then(response => response.json())
			.then(response => {
				//console.log("userAuthenticated worked lol")
				if(response.auth){
					valid = true;
                    fetch('https://stark-stream-43344.herokuapp.com/data')
                    .then(response => response.json())
                    .then(data =>{
                        this.setState({tablelist2: data}) 
                        //console.log('refresh',data)
                    })
                } else {
                    alert("session expired please login again!");
                }
            })
    }

    render(){
        let { data } = this.props;
        //console.log("table wala", tablelist);
        return(
            <div>
                <h2>Database</h2>
                <table id='user' className='center'>
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Address</th>
                </thead>
               <tbody>
                    {this.renderTableData()}
               </tbody>
            </table>
                <div className='pa3'>
                <form id = "delete">
                    <label className="db fw6 lh-copy f4" htmlFor="del">Enter The Id of the entry to be delated and, Click Refresh to fetch the database</label>
					<input onChange = {this.onValueChange} className="pa2 input-reset ba w-50" type="text" name="delete"  id="del"/>
                </form>
                    <button className = 'ma2' onClick={this.Delete}>Delete Entry</button>
                    <button onClick={this.Refresh}>Refresh</button>
                </div>
            </div>
        );
    }
}


export default Table;