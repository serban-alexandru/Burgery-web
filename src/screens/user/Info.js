import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory, Link } from "react-router-dom";
import data from "../../constants";

const Info = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [place, setPlace] = useState("");

  let history = useHistory();

  if (props.isAuth && props.token) {
    history.replace("/home");
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changeStreet = (e) => {
    setStreet(e.target.value);
  };

  const changePostcode = (e) => {
    setPostcode(e.target.value);
  };

  const changePlace = (e) => {
    setPlace(e.target.value);
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (!password) {
      alert("Please enter your password");
      return;
    }

    if (!repeatPassword || password != repeatPassword) {
      alert("Please repeat your password");
      return;
    }

    if (!name) {
      alert("Please enter your name");
      return;
    }

    if (!lastName) {
      alert("Please enter your lastName");
      return;
    }

    if (!phone) {
      alert("Please enter your phone");
      return;
    }

    if (!street) {
      alert("Please enter your street");
      return;
    }

    if (!postcode) {
      alert("Please enter your postcode");
      return;
    }

    if (!place) {
      alert("Please enter your place");
      return;
    }

    alert("Send post");
  };

  return (
    <div>
      <img
        src="./burger-bg.png"
        style={{ width: "100%", position: "absolute" }}
      />
      <div className="container">
        <div className="">
          <div className="row" style={{ paddingTop: "140px" }}>
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
            <div
              className="col-md-8 col-lg-6 col-sm-8 col-xs-12"
              style={{ marginBottom: "50px" }}
            >
              <div
                className="card"
                style={{
                  backgroundColor: "#131313",
                }}
              >
                <ProgressBar
                  now={33}
                  style={{
                    borderBottomRightRadius: "0",
                    borderBottomLeftRadius: "0",
                    height: "5px",
                  }}
                  variant="warning"
                />
                <div
                  className="card-body"
                  style={{
                    paddingRight: "5vw",
                    paddingLeft: "5vw",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <h1
                    className="text-center"
                    style={{
                      color: "#F2A83B",
                      fontWeight: "bold",
                      fontSize: "36px",
                    }}
                  >
                    ACCOUNT WIJZIGEN
                  </h1>
                  <br />
                  <form onSubmit={registerSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="e-mail"
                        onChange={changeEmail}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="wachtwoord"
                        onChange={changePassword}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Herhaal wachtwoord"
                        onChange={changeRepeatPassword}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Naam"
                        onChange={changeName}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Voornaam"
                        onChange={changeLastName}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="GSM-nummer"
                        onChange={changePhone}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Straat en huisnummer"
                        onChange={changeStreet}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Postcode"
                        onChange={changePostcode}
                        style={styles.input}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Plaats"
                        onChange={changePlace}
                        style={styles.input}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                        marginTop: "15px",
                        backgroundColor: "#F2A83B",
                        borderColor: "#F2A83B",
                      }}
                    >
                      Inloggen
                    </button>
                    <br />
                    <br />
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-3 col-sm-2 col-xs-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    backgroundColor: "#C4C4C4",
  },
};

export default Info;
