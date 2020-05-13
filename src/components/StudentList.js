import React from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import StudentTableRow from "./StudentTableRow";

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/students/")
      .then((res) => {
        this.setState({
          students: res.data,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
      </div>
    );
  }
}

export default StudentList;