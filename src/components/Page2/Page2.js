import React from 'react';
//import './page2.css';
import Table from './../Table/Table';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validNameRegex = RegExp('^(?=[A-Za-z0-9._]{4,20}$)[^_.].*[^_.]');
const validMobileRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
}

class Page2 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            tablelist: [],
			email: '',
			address: '',
			name: '',
            mobile: '',
            errors: {
                name: '',
                email: '',
                address: '',
                mobile: ''
            }
		}
	}
    componentDidMount(){
        fetch('http://localhost:4000/data')
        .then(response => response.json())
        .then(data =>{
            this.setState({tablelist: data}) 
            //console.log('mount',data)
        })
    }
	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onAddressChange = (event) => {
		this.setState({address: event.target.value});
	}

    onMobileChange = (event) => {
		this.setState({mobile: event.target.value});
	}

    handleEvent = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'name':
                errors.name = 
                    validNameRegex.test(value)
                        ? ''
                        : 'Username is not valid'
                break;

            case 'email':
                errors.email = 
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid'
                break;

            case 'mobile':
                errors.mobile = 
                    validMobileRegex.test(value) && value.length == 10
                        ? ''
                        : 'Mobile no. is not valid'
                break;
            default:
                break;
            
        }
        this.setState({errors, [name]: value}, () => {
            //console.log(errors);
        })
    }

    clearForm = () => {
        document.getElementById('data-entry-form').reset();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors)){
            console.info('Form is Valid')
        } else {
            console.error('Form is invalid')
        }
    }

	userAuthenticated = () => {
		fetch('http://localhost:4000/isUserAuth', {
			method: 'POST',
			headers: {'x-access-token': localStorage.getItem('token')},
		})
			.then(response => response.json())
			.then(response => {
				console.log(response)
				return true;
			})
			.catch(e => console.log(e))
		return false;   	
	}

	onSubmit = () => {
		console.log("Hello");
		if (this.userAuthenticated){
		fetch('http://localhost:4000/register', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				mobile: this.state.mobile,
                address: this.state.address
			})
		})
			.then(response => response.json())
			.then(user => {
					console.log(user);
                    alert("User added successfully")
			})
            .catch(e => {console.log(e)})

        this.clearForm();
		}
		else {
			alert("session expired please login again!");
		}
	}
	render(){
		const { onRouteChange } = this.props;
        const {errors} = this.state;
		return(
			<div>
				<p className= 'pa1' ></p>
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center ">
					<main className="pa4 black-80">
					  <div className="measure">
                        <form onSubmit={this.handleSubmit} id = 'data-entry-form' noValidate>
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" noValidate>
					      <legend className="f1 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
					        <input onChange = {this.handleEvent} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  title=" No spaces | Only alphanumeric characters" id="name" noValidate/>
                            {<small className='red'>{errors.name}</small>}
					      </div>
                          <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="mobile">Mobile No</label>
					        <input onChange = {this.handleEvent} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="mobile" required pattern="" id="name" noValidate/>
                            {<small className='red'>{errors.mobile}</small>}
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input onChange = {this.handleEvent} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email-address" noValidate/>
                            {<small className='red'>{errors.email}</small>}
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="address">Address</label>
					        <input onChange = {this.onAddressChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="address"  id="address" noValidate/>
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
					      	onClick = {this.onSubmit}
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value="Submit" />
					    </div>
                        </form>
					  </div>
					</main>
				</article>
                <Table data = {this.state.tablelist} />
			</div>
		);
	}
}


//alt + F3 -> selects multiple same word in sublime
//<p className= 'pa5' ></p> ->below first div
export default Page2;
