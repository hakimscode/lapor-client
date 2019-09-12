import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button
} from "reactstrap";

import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://api.fawwazlab.com/lapor/api/user";

    this.state = {
      users: [
        {
          id: "",
          nama_user: "",
          no_ktp: "",
          status: "",
          string_status: "",
          ktp_verified_at: "",
          jenis_user: "",
          string_jenis_user: ""
        }
      ]
    };
  }

  componentDidMount() {
    axios.get(this.API_URL + "/all").then(res => {
      this.setState({ users: res.data.result });
    });
  }

  activeClick = id_user => {
    if (window.confirm("Anda yakin ingin memverifikasi user ini?")) {
      axios.get(this.API_URL + "/verifikasi/" + id_user).then(res => {
        this.setState({
          users: this.state.users.map(user => {
            if (user.id === id_user) {
              user.status = res.data.result.status;
              user.string_status = res.data.result.string_status;
            }
            return user;
          })
        });
      });
    }
  };

  hapusClick = id_user => {
    if (window.confirm("Anda yakin ingin menghapus user ini?")) {
      axios.get(this.API_URL + "/delete/" + id_user).then(res => {
        this.setState({
          users: [
            ...this.state.users.filter(users => users.id !== res.data.result.id)
          ]
        });
      });
    }
  };

  getBtnActive = (status, id) => {
    if (status === "0") {
      return (
        <Button
          size="sm"
          color="success"
          className="mb-2 mr-1"
          id_jenis_laporan={id}
          onClick={this.activeClick.bind(this, id)}
        >
          Aktifkan
        </Button>
      );
    }
  };

  getBadegStatus = status => {
    return status === "0" ? "secondary" : status === "1" ? "success" : "";
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={8}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users{" "}
                <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">No KTP</th>
                      <th scope="col">Nama Lengkap</th>
                      <th scope="col">Jenis User</th>
                      <th scope="col">Status</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.no_ktp}</td>
                        <td>{row.nama_user}</td>
                        <td>{row.string_jenis_user}</td>
                        <td>
                          <Badge color={this.getBadegStatus(row.status)}>
                            {row.string_status}
                          </Badge>
                        </td>
                        <td>
                          {this.getBtnActive(row.status, row.id)}
                          <Button
                            size="sm"
                            color="danger"
                            className="mb-2 mr-1"
                            id_jenis_laporan={row.id}
                            onClick={this.hapusClick.bind(this, row.id)}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
