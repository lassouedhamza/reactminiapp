import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import ProductList from "./ProductList";
import NewProductModal from "./NewProductModal";

import axios from "axios";
import { API_URL } from "../constants";

class Home extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.resetState();
  }

  getProducts = () => {
    axios.get(API_URL+"listProduct").then(res => this.setState({ products: res.data })
    
    );
  };
  
  resetState = () => {
    this.getProducts();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <ProductList
              products={this.state.products}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewProductModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;