import React, { Component } from 'react';
import './App.css';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const firstNameRegex = RegExp(/^[a-zA-Z]+$/);
const phoneRegex = RegExp(/^[0-9]{10}/);

const validCheck = ({ errors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(errors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      phone: null,
      address: null,
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: ""
      }
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = { ...this.state.errors };

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let phone = document.getElementById("phone");
    let address = document.getElementById("address");

    errors.firstName =
      firstName.value.length === 0 ? "Required" :
        firstName.value.length < 3 ? "Minimum 3 characters required" : firstName.value.match(firstNameRegex) ? "" : "Please use alphabets only";

    errors.lastName =
      lastName.value.length === 0 ? "Required" :
        lastName.value.length < 3 ? "Minimum 3 characters required" : lastName.value.match(firstNameRegex) ? "" : "Please use alphabets only";

    errors.email =
      email.value.length === 0 ? "Required" :
        email.value.length < 3 ? "Minimum 3 characters required" : email.value.match(emailRegex) ? "" : "Invalid email address";

    errors.password =
      password.value.length === 0 ? "Required" :
        password.value.length < 6 ? "Minimum 6 characters required" : "";

    errors.phone =
      phone.value.length === 0 ? "Required" :
        !(phone.value.length === 10) ? "Exactly 10 characters required" : phone.value.match(phoneRegex) ? "" : "Invalid phone number";

    errors.address =
      address.value.length === 0 ? "Required" :
        address.value.length < 15 ? "Minimum 15 characters required" : "";

    this.setState({
      errors,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      address: address.value
    });

    if (validCheck(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
        Phone: ${this.state.phone}
        Address: ${this.state.address}
      `);

      this.render = () => {
        return (
          <div className="wrapper">
            <div className="form">
              <h1>Thank You for Contacting Us</h1>
              <h1>We will get back to you soon!</h1>
            </div>
          </div>
        )
      }
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="wrapper">
        <div className="form">
          <h1>Contact Form</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={errors.firstName.length > 0 ? "error" : null}
                type="text"
                id="firstName"
                placeholder="First Name"
                noValidate
              />
              {errors.firstName.length > 0 && (
                <span className="errorMessage">{errors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={errors.lastName.length > 0 ? "error" : null}
                ype="text"
                id="lastName"
                placeholder="Last Name"
                noValidate
              />
              {errors.lastName.length > 0 && (
                <span className="errorMessage">{errors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={errors.email.length > 0 ? "error" : null}
                type="email"
                id="email"
                placeholder="Email"
                noValidate
              />
              {errors.email.length > 0 && (
                <span className="errorMessage">{errors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={errors.password.length > 0 ? "error" : null}
                type="password"
                id="password"
                placeholder="Password"
                noValidate
              />
              {errors.password.length > 0 && (
                <span className="errorMessage">{errors.password}</span>
              )}
            </div>
            <div className="phone">
              <label htmlFor="phone">Phone</label>
              <input
                className={errors.phone.length > 0 ? "error" : null}
                type="text"
                id="phone"
                placeholder="Phone"
                noValidate
              />
              {errors.phone.length > 0 && (
                <span className="errorMessage">{errors.phone}</span>
              )}
            </div>
            <div className="address">
              <label htmlFor="address">Address</label>
              <input
                className={errors.address.length > 0 ? "error" : null}
                type="text"
                id="address"
                placeholder="Address"
                noValidate
              />
              {errors.address.length > 0 && (
                <span className="errorMessage">{errors.address}</span>
              )}
            </div>
            <div className="submit-form">
              <button type="submit">Submit Form</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}