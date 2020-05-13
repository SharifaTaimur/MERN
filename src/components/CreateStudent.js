import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

class CreateStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      rollno: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    //for this to work =
    //1)alaways set the value
    //2)always also set the name property
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        console.log(`this is the state after update ${this.state}`);
      }
    );
  }

  onSubmit(e) {
    e.preventDefault();

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno,
    };

    axios
      .post("http://localhost:3000/students/create-student", studentObject)
      .then((res) => console.log(res.data));

    this.setState({ name: "", email: "", rollno: "" });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h2>Create New Student</h2>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="Rollno">
              <Form.Label>Roll No</Form.Label>
              <Form.Control
                type="text"
                name="rollno"
                value={this.state.rollno}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button variant="danger" size="lg" block="block" type="submit">
              Create Student
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateStudent;
