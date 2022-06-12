import React, { Component } from "react";
import { Table } from "reactstrap";
import NewProductModal from "./NewProductModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class ProductList extends Component {
  render() {
    const products = this.props.products;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!products || products.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.fields.id}>
                <td>{product.fields.nom}</td>
                <td>{product.fields.description}</td>
                <td>{product.fields.image}</td>
               
                <td align="center">
                  <NewProductModal
                    create={false}
                    product={product}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    id={product.id}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default ProductList;