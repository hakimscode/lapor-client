import React, { Component } from "react";
import {
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

class JenisLaporan extends Component {
  constructor(props) {
    super(props);

    // this.API_URL = "http://localhost/laravel/lapor_online/api/jenis_laporan";
    this.API_URL = "https://api.fawwazlab.com/lapor/api/jenis_laporan";

    this.state = {
      jns_laporan: [
        {
          id: "",
          jenis_laporan: ""
        }
      ],
      txt_jenis_laporan: "",
      txt_id: "",

      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ jns_laporan: res.data.result });
    });
  }

  handleChange = e => {
    this.setState({
      txt_jenis_laporan: e.target.value
    });
  };

  editClick = id_jenis_laporan => {
    axios.get(this.API_URL + "/" + id_jenis_laporan).then(res => {
      this.setState({
        txt_id: id_jenis_laporan,
        txt_jenis_laporan: res.data.result.jenis_laporan,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = id_jenis_laporan => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.get(this.API_URL + "/delete/" + id_jenis_laporan).then(res => {
        this.setState({
          jns_laporan: [
            ...this.state.jns_laporan.filter(
              jns_laporan => jns_laporan.id !== res.data.result.id
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_jenis_laporan: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.txt_id === "") {
      axios
        .post(this.API_URL + "/insert", {
          jenis_laporan: this.state.txt_jenis_laporan
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              jns_laporan: [...this.state.jns_laporan, res.data.result]
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    } else {
      axios
        .put(this.API_URL + "/edit", {
          id: this.state.txt_id,
          jenis_laporan: this.state.txt_jenis_laporan
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              jns_laporan: this.state.jns_laporan.map(row_kel => {
                if (row_kel.id === res.data.result.id) {
                  row_kel.jenis_laporan = res.data.result.jenis_laporan;
                }
                return row_kel;
              })
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Jenis Laporan
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Jenis Laporan</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.jns_laporan.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.jenis_laporan}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            className="mb-2 mr-1"
                            id_jenis_laporan={row.id}
                            onClick={this.hapusClick.bind(this, row.id)}
                          >
                            Hapus
                          </Button>
                          <Button
                            size="sm"
                            color="success"
                            className="mb-2 mr-1"
                            id_jenis_laporan={row.id}
                            onClick={this.editClick.bind(this, row.id)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Jenis Laporan
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="jenis-laporan">Jenis Laporan</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.txt_jenis_laporan}
                        required
                        placeholder="Jenis Laporan"
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

export default JenisLaporan;
