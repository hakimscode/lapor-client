import { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

export class AuthenticatedComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: "",
        nama_lengkap: "",
        username: ""
      },
      username: null,
      password: null
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem("jwt-token-lapor-online");
    if (!jwt) {
      this.props.history.push("/login");
    } else {
      Axios.get(
        "https://api.fawwazlab.com/lapor/api/user/get_user_by_token/" + jwt
      ).then(res => {
        if (res.data.id === 0) {
          this.props.history.push("/login");
        } else {
          this.setState({ user: res.data });
        }
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(AuthenticatedComponent);
