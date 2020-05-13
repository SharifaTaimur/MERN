import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
    this.state = {
      name: "",
      email: "",
      rollno: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    axios
      .get(`http://localhost:3000/students/edit-student/${params.id}`)
      .then((res) => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(e) {
    //alert("are you there?");
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        console.log(`this is the state after update`);
        console.log(this.state);
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
      .put(
        "http://localhost:3000/students/update-student/" +
          this.props.match.params.id,
        studentObject
      )
      .then((res) => {
        console.log(res.data);
        console.log("Student successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });

    // Redirect to Student List
    this.props.history.push("/student-list");
  }

  render() {
    return (
      <div className="container">
        <h2>Edit Student</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="Rollno">
            <Form.Label>Roll No</Form.Label>
            <Form.Control
              name="rollno"
              type="text"
              value={this.state.rollno}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Update Student
          </Button>
        </Form>
      </div>
    );
  }
}

export default EditStudent;
