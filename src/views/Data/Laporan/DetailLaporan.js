import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Jumbotron,
  Row,
  Badge,
  Input
} from "reactstrap";
import axios from "axios";

export class DetailLaporan extends Component {
  constructor(props) {
    super(props);

    // this.API_URL = "http://localhost/laravel/lapor_online/api/laporan";
    this.API_URL = "https://api.fawwazlab.com/lapor/api/laporan";

    this.state = {
      laporan: [
        {
          id: "",
          jenis_laporan: "",
          user_id: "",
          nama_pelapor: "",
          tanggal_kejadian: "",
          tanggal_lapor: "",
          judul_laporan: "",
          deskripsi_laporan: "",
          alamat: "",
          latitude: "",
          longitude: "",
          gambar: "",
          gambar2: "",
          gambar3: "",
          verified: "",
          status: "",
          id_status: "",
          public: ""
        }
      ],
      tmp_id: "",
      tmp_jenis_laporan: "",
      tmp_user_id: "",
      tmp_nama_pelapor: "",
      tmp_tanggal_kejadian: "",
      tmp_tanggal_lapor: "",
      tmp_judul_laporan: "",
      tmp_deskripsi_laporan: "",
      tmp_alamat: "",
      tmp_latitude: "",
      tmp_longitude: "",
      tmp_gambar: "",
      tmp_gambar2: "",
      tmp_gambar3: "",
      tmp_verified: "",
      tmp_status: "",
      tmp_id_status: "",
      txt_public: "",

      color_status: "",
      color_verified: "",
      value_simpan: "Simpan"
    };

    this.verifikasiLaporan = this.verifikasiLaporan.bind(this);
    this.closeLaporan = this.closeLaporan.bind(this);
    this.tolakLaporan = this.tolakLaporan.bind(this);
  }

  componentDidMount() {
    const laporanid = this.props.match.params.laporanid;
    axios
      .get(this.API_URL + "/" + laporanid)
      .then(res => this.setState({ laporan: res.data.result }));
  }

  verifikasiLaporan = () => {
    axios
      .get(this.API_URL + "/verifikasi_laporan/" + this.state.laporan.id)
      .then(res => this.setState(this.setState({ laporan: res.data.result })));
  };

  closeLaporan = () => {
    axios
      .post(this.API_URL + "/update_status", {
        id: this.state.laporan.id,
        status: 3
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            laporan: res.data.result
          });
        } else {
          console.log("error");
        }
      });
  };

  tolakLaporan = () => {
    axios
      .get(this.API_URL + "/tolak_laporan/" + this.state.laporan.id)
      .then(res => this.setState(this.setState({ laporan: res.data.result })));
  };

  btnActionView = () => {
    if (
      this.state.laporan.verified === "0" &&
      this.state.laporan.id_status !== "4"
    ) {
      return (
        <Row>
          <Col xs="12" xl="2">
            <Button color="success" onClick={this.verifikasiLaporan}>
              Verifikasi Laporan
            </Button>
          </Col>
          <Col xs="12" xl="2">
            <Button color="danger" onClick={this.tolakLaporan}>
              Tolak Laporan
            </Button>
          </Col>
        </Row>
      );
    } else if (this.state.laporan.id_status === "4") {
      return (
        <Badge className="mr-1" color="danger">
          {this.state.laporan.status}
        </Badge>
      );
    } else if (this.state.laporan.id_status === "3") {
      return (
        <Badge className="mr-1" color="success">
          {this.state.laporan.status}
        </Badge>
      );
    } else {
      return (
        <Row>
          <Col xs="12" xl="2">
            <Button color="success" onClick={this.closeLaporan}>
              Kasus Selesai
            </Button>
          </Col>
        </Row>
      );
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Jumbotron</strong>
              </CardHeader>
              <CardBody>
                <Jumbotron>
                  <h1 className="display-3">
                    {this.state.laporan.judul_laporan}
                  </h1>
                  <p>
                    Tanggal Lapor : {this.state.laporan.tanggal_lapor}, Tanggal
                    Kejadian : {this.state.laporan.tanggal_kejadian}
                  </p>
                  <p>Pelapor : {this.state.laporan.nama_pelapor}</p>
                  <p className="lead">
                    <strong>{this.state.laporan.jenis_laporan}</strong>,&nbsp;
                    {this.state.laporan.deskripsi_laporan}
                  </p>
                  <Row>
                    <Col xs="12" xl="4">
                      <img
                        className="d-block w-100"
                        height="300px"
                        src={this.state.laporan.gambar}
                        alt=""
                      />
                    </Col>
                    <Col xs="12" xl="4">
                      <img
                        className="d-block w-100"
                        height="300px"
                        src={this.state.laporan.gambar2}
                        alt=""
                      />
                    </Col>
                    <Col xs="12" xl="4">
                      <img
                        className="d-block w-100"
                        height="300px"
                        src={this.state.laporan.gambar3}
                        alt=""
                      />
                    </Col>
                  </Row>
                  <hr className="my-2" />
                  <p>{this.state.laporan.alamat}</p>
                  {this.btnActionView()}
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DetailLaporan;
