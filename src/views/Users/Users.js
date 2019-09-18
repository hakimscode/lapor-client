import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "https://api.fawwazlab.com/lapor/api/user";

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
      ],
      txt_id: "",
      txt_no_ktp: "",
      txt_nama: "",
      txt_password: "",
      txt_password_2: "",
      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL + "/all").then(res => {
      this.setState({ users: res.data.result });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.txt_password !== this.state.txt_password_2) {
      alert("Password tidak cocok !");
    } else {
      let tglNow = new Date()
        .toJSON()
        .slice(0, 19)
        .replace("T", " ");
      axios
        .post(this.API_URL + "/insert", {
          nama_user: this.state.txt_nama,
          no_ktp: this.state.txt_no_ktp,
          password: this.state.txt_password,
          status: 1,
          ktp_verified_at: tglNow,
          jenis_user: 1
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              users: [res.data.result, ...this.state.users]
            });
            this.setState({
              txt_nama: "",
              txt_no_ktp: "",
              txt_password: "",
              txt_password_2: ""
            });
          } else {
            console.log("error");
          }
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
                <i className="fa fa-align-justify"></i> Users
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

          <Col xs="12" lg="4">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tambah User Polisi
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="jenis-laporan">No KTP</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="txt_no_ktp"
                        onChange={this.handleChange}
                        value={this.state.txt_no_ktp}
                        required
                        placeholder="No KTP"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="jenis-laporan">Nama</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="txt_nama"
                        onChange={this.handleChange}
                        value={this.state.txt_nama}
                        required
                        placeholder="Nama Lengkap"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="jenis-laporan">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="password"
                        name="txt_password"
                        onChange={this.handleChange}
                        value={this.state.txt_password}
                        required
                        placeholder="Password"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="jenis-laporan">Ulangi Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="password"
                        name="txt_password_2"
                        onChange={this.handleChange}
                        value={this.state.txt_password_2}
                        required
                        placeholder="Ulangi Password"
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i>{" "}
                    {this.state.value_simpan}
                  </Button>
                  <Button size="sm" color="danger" onClick={this.cancelClick}>
                    <i className="fa fa-ban"></i> Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
