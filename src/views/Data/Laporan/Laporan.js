import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from "reactstrap";
import { AppSwitch } from "@coreui/react";
//import DetailLaporan from "./DetailLaporan";
import axios from "axios";

class Laporan extends Component {
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

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.cancelClick = this.cancelClick.bind(this);
    // this.detailClick = this.detailClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ laporan: res.data.result });
    });
  }

  editClick = id_jenis_laporan => {
    axios.get(this.API_URL + "/" + id_jenis_laporan).then(res => {
      this.setState({
        tmp_id: id_jenis_laporan,
        tmp_jenis_laporan: res.data.result.jenis_laporan,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = id_jenis_laporan => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.get(this.API_URL + "/delete/" + id_jenis_laporan).then(res => {
        this.setState({
          laporan: [
            ...this.state.laporan.filter(
              laporan => laporan.id !== res.data.result.id
            )
          ]
        });
      });
    }
  };

  changePublik = (e, id_laporan) => {
    let msg = e.target.checked ? "Mempublikasi" : "Memprivasi";
    let val_pub = e.target.checked ? 1 : 0;

    if (window.confirm("Anda yakin ingin " + msg + " laporan ini?")) {
      axios
        .post(this.API_URL + "/update_publikasi", {
          id: id_laporan,
          public: val_pub
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              laporan: this.state.laporan.map(row_laporan => {
                if (row_laporan.id === id_laporan) {
                  row_laporan.public = res.data.result.public;
                }
                return row_laporan;
              })
            });
          } else {
            console.log("error");
          }
        });
    }
  };

  colorStatus = param => {
    switch (param) {
      case "0":
        return "secondary";
      case "1":
        return "warning";
      case "2":
        return "warning";
      case "3":
        return "success";
      case "4":
        return "danger";
      default:
        return "";
    }
  };

  linkDetailId = id => {
    return "/data/laporan/" + id;
  };

  chkPublic = pub => {
    return pub === "1" ? true : false;
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Laporan
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Jenis Laporan</th>
                      <th>Nama Pelapor</th>
                      <th>Tanggal Kejadian</th>
                      <th>Tanggal Lapor</th>
                      <th>Judul</th>
                      <th>Status</th>
                      <th>Publikasi</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.laporan.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.jenis_laporan}</td>
                        <td>{row.nama_pelapor}</td>
                        <td>{row.tanggal_kejadian}</td>
                        <td>{row.tanggal_lapor}</td>
                        <td>{row.judul_laporan}</td>
                        <td>
                          <Badge color={this.colorStatus(row.id_status)}>
                            {row.status}
                          </Badge>
                        </td>
                        <td>
                          <AppSwitch
                            className={"mx-1"}
                            variant={"pill"}
                            color={"primary"}
                            onChange={e => {
                              this.changePublik(e, row.id);
                            }}
                            checked={this.chkPublic(row.public)}
                          />
                        </td>
                        <td>
                          <Link to={this.linkDetailId(row.id)}>Detail</Link>
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

export default Laporan;
