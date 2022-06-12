import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";


const CREATE_PRODUCT = `
mutation{
  addProducts(
    nom:"ddd"
    description:"manita"
    image : "etst"
  ){
    product{
      nom
      description
      image
    }
  
  }}
`;
export default function NewProductForm() {
  const initialProductState = {
    nom: "",
    description: "",
    image : ""
    
  }
  const [product, setProduct] = useState(initialProductState);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });

  };
  let state = {data: {imageFile:""}}
  const handleImageChange = ({ currentTarget: input }) => {
    console.log("here we goo ");
      let data = state.data;
      data[input.name] = input.files[0];
      
      console.log(input.name)
      console.log(input.files[0])
      
      state.data = data;
      console.log(state.data)
      console.log(typeof data)
     
  }

  let saveProduct = async () => {
    const data = new FormData();
    data.append('query', CREATE_PRODUCT)
    data.append('nom', product.nom)
    data.append('description', product.description)
    data.append('image',state.data.imageFile)
       
       
    
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    let result = ''
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/product/graphql',
      data: data,
      config: {
        headers: {
          'Content-Tranfer-Encoding': 'multipart/form-data', 'Content-Type': 'application/graphql'
          , 'Access-Control-Allow-Credentials': 'true'
        }
      },
      withCredentials: false,
    })
      .then(function (response) {
        console.log(response);
        result = response;
      })
      .catch(function (response) {
        console.log(response)
        result = response;
      })
  }



  return (
    <div>

      
      <form method="post">
        <h5>ADD PRoduct here</h5>
        <div className="form-group">
        <label  htmlFor="input">Product name </label>
        <input type="text" 
                        id="nom"
                         required="required"
                         value={product.nom}
                         onChange={handleInputChange}
                         name="nom"
                         />
       

        </div>
        <div className="form-group">
        <label  htmlFor="input">Product description </label>
        <input type="text" 
                        id="description"
                         required="required"
                         value={product.description}
                         onChange={handleInputChange}
                         name="description"
                         />
       

        </div>
        <div className="form-group">
                        <label htmlFor="ImageFile">Profile Image</label>
                        <input name="imageFile" 
                        id="image" required type="file" className="form-control"  onChange={handleImageChange}/>
        </div>
        <button type='button' onClick={saveProduct}>save prod</button>



      </form>
      
    </div>
  );
}
