import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import LandingPage from "./screens/LandingPage";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Cart from "./screens/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Dropdown } from "react-bootstrap";
import ModalContent from "./components/ModalContent";
import CheckEmail from "./screens/auth/CheckEmail";
import PostCode from "./screens/auth/PostCode";
import OrderDetails from "./screens/OrderDetails";
import Orders from "./screens/user/Orders";
import Info from "./screens/user/Info";

import "./App.css";

import {
  faCoffee,
  faShoppingBag,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import ForgotPassword from "./screens/auth/ForgotPassword";
function App() {
  const savedAuth = localStorage.getItem("auth");
  const savedToken = localStorage.getItem("token");
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  const savedSauces = JSON.parse(localStorage.getItem("sauces"));
  const [coupon, setCoupon] = useState({});

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const savedType = localStorage.getItem("type");
  const savedTime = localStorage.getItem("time");
  const savedDeliveryTime = localStorage.getItem("deliveryTime");

  const [isAuth, setAuth] = useState(savedAuth ? savedAuth : false);
  const [token, setToken] = useState(savedToken ? savedToken : "");
  const [cart, setCart] = useState(savedCart ? savedCart : []);
  const [sauces, setSauces] = useState(savedSauces ? savedSauces : []);

  const [user, setUser] = useState(loggedUser ? loggedUser : {});
  const [show, setShow] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [adress, setAdress] = useState("");

  // Order details
  const [type, setType] = useState(savedType ? savedType : 1); // order type (takeout / delivery)
  const [time, setTime] = useState(savedTime ? savedTime : "0"); // delivery time type :)) // if 0 - asap / if 1 - pick time
  const [deliveryTime, setDeliveryTime] = useState(
    savedDeliveryTime ? savedDeliveryTime : "0"
  ); // picked time if needed

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log(localStorage.getItem("user"));

  const resetStorage = () => {
    localStorage.clear();
    window.location.reload(false);
    console.log("storage cleared");
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  const seeDisplay = () => {
    const { innerWidth: width, innerHeight: height } = window;

    if (width <= 767) {
      return "block";
    }
    return "none";
  };

  return (
    <div>
      <div
        className="row"
        style={{ maxWidth: "100vw", margin: "0px", overflowX: "hidden" }}
      >
        <div
          className="col-md-9"
          style={{
            padding: "0px",
            backgroundColor: "#3E3E3E",
            minHeight: "100vh",
          }}
        >
          <Router>
            <Navbar variant="dark" style={{ backgroundColor: "#1C1C1C" }}>
              <Container>
                <Navbar.Brand
                  onClick={() => {
                    // resetStorage();
                    window.location.replace("/login");
                  }}
                >
                  <img src="./logo.png" style={{ height: "60px" }} />
                </Navbar.Brand>
                <Nav className="ml-auto">
                  <Nav.Link href="#">
                    {/* <Link style={styles} to="/">
                    LandingPage
                  </Link> */}
                  </Nav.Link>
                  {!token ? (
                    <tag className="row" style={{ marginRight: "20px" }}>
                      <Nav.Link href="#">
                        <Link
                          to="/register"
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            lineHeight: "21px",
                            color: "white",
                            marginRight: "35px",
                          }}
                        >
                          Registreren
                        </Link>
                      </Nav.Link>

                      <Nav.Link href="#">
                        <Link
                          to="/login"
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            lineHeight: "21px",
                            color: "white",
                          }}
                        >
                          Inloggen
                        </Link>
                      </Nav.Link>
                    </tag>
                  ) : (
                    <tag className="row" style={{ marginRight: "20px" }}>
                      <Nav.Link href="#" style={{ paddingTop: "20px" }}>
                        <Link
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            lineHeight: "21px",
                            color: "white",
                            marginRight: "55px",
                            paddingRight: "20px",
                          }}
                        >
                          <Dropdown>
                            <Dropdown.Toggle
                              style={{
                                backgroundColor: "#1C1C1C",
                                border: "none",
                                padding: "0px",
                              }}
                            >
                              {user.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ marginTop: "20px" }}>
                              <Dropdown.Item
                                style={{
                                  padding: "0px",
                                  textAlign: "center",
                                  padding: "5px 30px",
                                }}
                                onClick={() => {
                                  window.location.replace("/user_details");
                                }}
                              >
                                Profiel wijzigen
                              </Dropdown.Item>
                              <Dropdown.Item
                                href="/my_orders"
                                style={{
                                  padding: "0px",
                                  textAlign: "center",
                                  padding: "5px 30px",
                                }}
                                onClick={() => {
                                  window.location.replace("/my_orders");
                                }}
                              >
                                Bestelgeschiedenis
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Link>
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => logout()}
                        style={{ paddingTop: "20px" }}
                      >
                        <Link
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            lineHeight: "21px",
                            color: "#F2A83B",
                          }}
                        >
                          Uitloggen
                        </Link>
                      </Nav.Link>
                    </tag>
                  )}
                  <Nav.Link href="#">
                    {/* <Link style={styles} to="/home">
                    Home
                  </Link> */}
                  </Nav.Link>
                </Nav>
              </Container>
              {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form> */}
            </Navbar>

            <Switch>
              <Route path="/login">
                <Login
                  token={token}
                  setToken={setToken}
                  isAuth={isAuth}
                  setAuth={setAuth}
                  user={user}
                  setUser={setUser}
                />
              </Route>
              <Route path="/forgot_password">
                <ForgotPassword />
              </Route>
              <Route path="/check_email">
                <CheckEmail />
              </Route>
              <Route path="/postcode">
                <PostCode token={token} />
              </Route>
              <Route path="/order_details">
                <OrderDetails
                  type={type}
                  setType={setType}
                  time={time}
                  setTime={setTime}
                  deliveryTime={deliveryTime}
                  setDeliveryTime={setDeliveryTime}
                  token={token}
                />
              </Route>
              <Route path="/user_details">
                <Info token={token} setUser={setUser} user={user} />
              </Route>
              <Route path="/my_orders">
                <Orders
                  token={token}
                  cart={cart}
                  setCart={setCart}
                  user={user}
                  coupon={coupon}
                  setCoupon={setCoupon}
                />
              </Route>
              <Route path="/register">
                <Register
                  token={token}
                  setToken={setToken}
                  isAuth={isAuth}
                  setAuth={setAuth}
                  user={user}
                  setUser={setUser}
                />
              </Route>
              <Route path="/home">
                <Home
                  cart={cart}
                  setCart={setCart}
                  sauces={sauces}
                  setSauces={setSauces}
                />
              </Route>
              <Route path="/">
                <LandingPage />
              </Route>
            </Switch>
          </Router>
        </div>

        <Cart
          cart={cart}
          setCart={setCart}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          token={token}
          type={type}
          time={time}
          deliveryTime={deliveryTime}
          adress={adress}
          setAdress={setAdress}
          user={user}
          sauces={sauces}
          setSauces={setSauces}
          coupon={coupon}
          setCoupon={setCoupon}
        />
      </div>
      <Button
        variant="primary"
        style={{
          position: "fixed",
          bottom: "15px",
          right: "15px",
          padding: "15px",
          borderRadius: "30px",
          fontSize: "20px",
          backgroundColor: "#f2a83b",
          borderColor: "#f2a83b",
          display: seeDisplay(),
        }}
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faShoppingCart} /> ({cart.length})
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{ background: "#1C1C1C", color: "white", border: "0px" }}
          closeButton
          closeButton={false}
        >
          <Modal.Title style={{ textAlign: "center", fontSize: "24px" }}>
            MIJN BESTELLING
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1C1C1C", border: "0px" }}>
          <ModalContent cart={cart} setCart={setCart} />
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#1C1C1C", border: "0px" }}>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ backgroundColor: "#F2A83B" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const styles = {
  textDecoration: "none",
  color: "white",
};

export default App;
