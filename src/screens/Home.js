import React, { useState, useEffect } from "react";
import Axios from "axios";
import data from "../constants";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Home = (props) => {
  var [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories"))
      ? JSON.parse(localStorage.getItem("categories"))
      : []
  );
  const [products, setProducts] = useState([]);
  const [pickedCat, setPickedCat] = useState(0);
  const [show, setShow] = useState([]);

  const handleCloseOption = (index) => {
    let new_arr = show;

    new_arr[index] = false;

    setShow([...new_arr]);
  };

  const handleShowOption = (index) => {
    let new_arr = show;

    new_arr[index] = true;

    setShow([...new_arr]);
  };

  if (!localStorage.getItem("type")) {
    window.location.replace("/order_details");
  }

  if (categories.length == 0) {
    Axios.get(data.baseUrl + "/api/categories").then((res) => {
      setCategories(res.data.categories);
      localStorage.setItem("categories", JSON.stringify(res.data.categories));
      // console.log(JSON.parse(localStorage.getItem("categories")));
      // console.log(categories);
    });
  }

  const pickCategory = (id) => {
    setPickedCat(id);
    Axios.get(data.baseUrl + "/api/category/" + id + "/products").then(
      (res) => {
        // console.log(res.data.products);
        setProducts(res.data.products);
        // console.log(products);
      }
    );
  };

  const removeSauce = (id) => {
    const output_array = [];
    let deleted = 0;
    const old_sauces = props.sauces.reverse();
    old_sauces.map((sauce, i) => {
      if (sauce.id == id && deleted == 1) {
        output_array.push(sauce);
      }
      if (sauce.id == id && deleted == 0) {
        deleted = 1;
      }

      if (sauce.id != id) {
        output_array.push(sauce);
      }
    });

    output_array.reverse();
    props.setSauces(output_array);
    localStorage.setItem("sauces", JSON.stringify(output_array));
  };

  const addToCart = (product) => {
    // console.log(product);
    props.setCart([...props.cart, product]);
    localStorage.setItem("cart", JSON.stringify([...props.cart, product]));
    console.log(props.cart);
  };

  const addSauce = (sauce) => {
    // console.log(product);
    props.setSauces([...props.sauces, sauce]);
    localStorage.setItem("sauces", JSON.stringify([...props.sauces, sauce]));
  };

  // const [bumm, setBumm] = useEffect(0);

  // const generateUnique = () => {
  //   setBumm(bumm + 1);
  //   return bumm;
  // };

  return (
    <div>
      <img
        src="./burger-bg.png"
        style={{ width: "100%", position: "absolute" }}
      />
      <div className="container">
        <div className="">
          <div className="row" style={{ paddingTop: "140px" }}>
            <div className="col-md-12">
              {categories.map((category) => {
                if (category.id == pickedCat) {
                  return (
                    <button
                      className="btn"
                      onClick={() => pickCategory(category.id)}
                      style={styles.categoryPicked}
                    >
                      {category.name}
                    </button>
                  );
                }
                return (
                  <button
                    className="btn"
                    onClick={() => pickCategory(category.id)}
                    style={styles.category}
                  >
                    {category.name}
                  </button>
                );
              })}
              {products.map((product, index) => {
                return (
                  <div className="card" style={styles.prductCard}>
                    <img
                      src={product.image}
                      style={{
                        height: "120px",
                        width: "120px",
                        margin: "-15px",
                      }}
                    />
                    <tag style={styles.prodData}>
                      {product.name}

                      {product.tags.map((tag) => {
                        return (
                          <tag
                            style={{
                              padding: "2px 10px",
                              backgroundColor: tag.color,
                              marginLeft: "7px",
                              borderRadius: "10px",
                              textTransform: "uppercase",
                              fontSize: "15px",
                              // border: "1px solid white",
                            }}
                          >
                            {tag.name}
                          </tag>
                        );
                      })}

                      <tag
                        className="float-right text-center"
                        style={{ color: "#F2A83B", fontWeight: "bold" }}
                      >
                        €{product.price}
                        <br />
                        {product.options && product.options.length > 0 ? (
                          <span>
                            <button
                              className="btn"
                              style={styles.btnAdd}
                              onClick={() => {
                                handleShowOption(index);
                              }}
                            >
                              + voeg toe
                            </button>
                            <Modal
                              show={show[index]}
                              onHide={() => handleCloseOption(index)}
                            >
                              <Modal.Header
                                closeButton
                                style={{
                                  backgroundColor: "#1C1C1C",
                                  border: "none",
                                  color: "white",
                                }}
                              >
                                <Modal.Title>
                                  {product.option_category.name}
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body
                                style={{
                                  backgroundColor: "#1C1C1C",
                                  border: "none",
                                  color: "white",
                                }}
                              >
                                {product.options.map((option, i) => {
                                  if (localStorage.getItem("unique")) {
                                    localStorage.setItem(
                                      "unique",
                                      parseInt(localStorage.getItem("unique")) +
                                        1
                                    );
                                  } else {
                                    localStorage.setItem("unique", 1);
                                  }
                                  const idd = localStorage.getItem("unique");
                                  return (
                                    <div
                                      className="alert alert-warning"
                                      style={{
                                        backgroundColor: "#f2a83b",
                                        color: "white",
                                        border: "0px",
                                        textAlign: "left",
                                        fontSize: "24px",
                                      }}
                                    >
                                      <span style={{ float: "" }}>
                                        {option.name}
                                      </span>
                                      <input
                                        type="checkbox"
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                          float: "right",
                                          marginTop: "9px",
                                          borderRadius: "50%",
                                        }}
                                        id={idd}
                                        onChange={() => {
                                          if (props.sauces) {
                                            if (
                                              document.getElementById(idd)
                                                .checked
                                            ) {
                                              addSauce(option);
                                            } else {
                                              removeSauce(option.id);
                                            }
                                          } else {
                                          }
                                        }}
                                      />
                                      <span
                                        style={{
                                          float: "right",
                                          marginRight: "10px",
                                        }}
                                      >
                                        ‎€ {option.price.toFixed(2)}
                                      </span>
                                    </div>
                                  );
                                })}
                              </Modal.Body>
                              <Modal.Footer
                                style={{
                                  backgroundColor: "#1C1C1C",
                                  border: "none",
                                  color: "white",
                                }}
                              >
                                <Button
                                  variant="secondary"
                                  onClick={() => handleCloseOption(index)}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    addToCart(product);
                                    if (product.pickedOptions) {
                                      product.pickedOptions.map((sauce) => {
                                        console.log("da");
                                        console.log(sauce);
                                        addSauce(sauce);
                                        console.log("end");
                                      });
                                    }

                                    product.pickedOptions = [];
                                    handleCloseOption(index);
                                  }}
                                  style={{
                                    backgroundColor: "#F2A83B",
                                    border: "1px #F2A83B",
                                  }}
                                >
                                  Add product
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </span>
                        ) : (
                          <button
                            className="btn"
                            style={styles.btnAdd}
                            onClick={() => addToCart(product)}
                          >
                            + voeg toe
                          </button>
                        )}
                      </tag>
                      <br />
                      <tag style={styles.prodDesc}>{product.description}</tag>
                    </tag>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

let prductCard = {
  marginTop: "25px",
  padding: "-10px",
  backgroundColor: "#696969",
  display: "inline-block",
  width: "100%",
  height: "87px",
};

let prodDesc = {
  fontSize: "16px",
};

let prodData = {
  position: "absolute",
  marginTop: "10px",
  marginLeft: "10px",
  fontSize: "24px",
  fontWeight: "500",
  color: "white",
  width: "100%",
  paddingRight: "100px",
};

const { innerWidth: width, innerHeight: height } = window;
// console.log(width)
if (width < 900) {
  prductCard = {
    marginTop: "25px",
    padding: "-10px",
    backgroundColor: "#696969",
    display: "inline-block",
    width: "100%",
    height: "80px",
  };
  prodDesc = {
    display: "none",
  };
  prodData.fontSize = "20px";
}

const styles = {
  category: {
    width: width < 900 ? "105px" : "205px",
    backgroundColor: "blue",
    padding: "3px 20px",
    borderRadius: "3px",
    backgroundColor: "black",
    color: "white",
    textDecoration: "none",
    marginRight: "10px",
    marginBottom: "10px",
    textAlign: "center",
  },
  categoryPicked: {
    width: width < 900 ? "105px" : "205px",
    backgroundColor: "blue",
    padding: "3px 20px",
    borderRadius: "3px",
    backgroundColor: "#F2A83B",
    color: "white",
    textDecoration: "none",
    marginRight: "10px",
    marginBottom: "10px",
    textAlign: "center",
  },
  btnAdd: {
    width: "120px",
    backgroundColor: "blue",
    padding: "3px 10px",
    borderRadius: "3px",
    backgroundColor: "#F2A83B",
    color: "white",
    textDecoration: "none",
    marginBottom: "-20px",
    marginRight: "-10px",
    fontSize: "16px",
  },
  prductCard: prductCard,
  prodDesc: prodDesc,
  prodData: prodData,
};

export default Home;
