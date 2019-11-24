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
          pangkat: "",
          jabatan: "",
          instansi: "",
          alamat: "",
          no_hp: "",
          email: "",
          status: "",
          string_status: "",
          ktp_verified_at: "",
          jenis_user: "",
          string_jenis_user: ""
        }
      ],
      txt_id: "",
      txt_nama: "",
      txt_no_ktp: "",
      txt_pangkat: "",
      txt_jabatan: "",
      txt_instansi: "",
      txt_alamat: "",
      txt_no_hp: "",
      txt_email: "",
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
          pangkat: this.state.txt_pangkat,
          jabatan: this.state.txt_jabatan,
          instansi: this.state.txt_instansi,
          alamat: this.state.txt_alamat,
          no_hp: this.state.txt_no_hp,
          email: this.state.txt_email,
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
              txt_pangkat: "",
              txt_jabatan: "",
              txt_instansi: "",
              txt_alamat: "",
              txt_no_hp: "",
              txt_email: "",
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
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tambah User Polisi
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <Row>
                    <Col>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputCity">NRP</label>
                          <Input
                            id="feInputCity"
                            placeholder="Input NRP"
                            name="txt_no_ktp"
                            onChange={this.handleChange}
                            value={this.state.txt_no_ktp}
                            required
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputCity">Nama</label>
                          <Input
                            id="feInputCity"
                            placeholder="Input Nama Lengkap"
                            name="txt_nama"
                            onChange={this.handleChange}
                            value={this.state.txt_nama}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputCity">Pangkat</label>
                          <Input
                            id="feInputCity"
                            placeholder="Input Pangkat"
                            name="txt_pangkat"
                            onChange={this.handleChange}
                            value={this.state.txt_pangkat}
                            required
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputCity">Jabatan</label>
                          <Input
                            id="feInputCity"
                            placeholder="Input Jabatan"
                            name="txt_jabatan"
                            onChange={this.handleChange}
                            value={this.state.txt_jabatan}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputCity">Instansi</label>
                          <Input
                            id="feInputCity"
                            placeholder="Input Instansi"
                            name="txt_instansi"
                            onChange={this.handleChange}
                            value={this.state.txt_instansi}
                            required
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputCity">Alamat</label>
                          <Input
                            id="feInputCity"
                            placeholder="Input Alamat"
                            name="txt_alamat"
                            onChange={this.handleChange}
                            value={this.state.txt_alamat}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputCity">No HP</label>
                          <Input
                            id="feInputCity"
                            type="number"
                            placeholder="Input No Handphone"
                            name="txt_no_hp"
                            onChange={this.handleChange}
                            value={this.state.txt_no_hp}
                            required
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputCity">Email</label>
                          <Input
                            id="feInputCity"
                            type="email"
                            placeholder="Input email"
                            name="txt_email"
                            onChange={this.handleChange}
                            value={this.state.txt_email}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row form>
                        <Col md="6" className="form-group">
                          <Label htmlFor="jenis-laporan">Password</Label>
                          <Input
                            type="password"
                            name="txt_password"
                            onChange={this.handleChange}
                            value={this.state.txt_password}
                            required
                            placeholder="Password"
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <Label htmlFor="jenis-laporan">Ulangi Password</Label>
                          <Input
                            type="password"
                            name="txt_password_2"
                            onChange={this.handleChange}
                            value={this.state.txt_password_2}
                            required
                            placeholder="Ulangi Password"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
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

          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">No KTP / NRP</th>
                      <th scope="col">Nama Lengkap</th>
                      <th scope="col">Pangkat</th>
                      <th scope="col">Jabatan</th>
                      <th scope="col">Instansi</th>
                      <th scope="col">Alamat</th>
                      <th scope="col">No. HP</th>
                      <th scope="col">Email</th>
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
                        <td>{row.pangkat}</td>
                        <td>{row.jabatan}</td>
                        <td>{row.instansi}</td>
                        <td>{row.alamat}</td>
                        <td>{row.no_hp}</td>
                        <td>{row.email}</td>
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
