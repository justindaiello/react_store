import React, { Component } from 'react';
import { Mutation } from 'react-apollo'; //allow us to push/change data
import gql from 'graphql-tag'; //access gql queries
import Router from 'next/router'; //to route to single page on form submit
import Form from './styles/Form';
import Error from './ErrorMessage';


//query for submit mutation
// use create item mutation from the backend schema.graphql
const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
) {
  createItem(
    title: $title
    description: $description
    price: $price
    image: $image
    largeImage: $largeImage
  ) {
    id
  }
}
`;

class CreateItem extends Component {

  // local state just needed for this component/form
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  };

  //this.setState({ [e.target.id]: e.target.value }) isnt good enough for this case.
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value; //prevents quotes
    this.setState({ [name]: val });
  }

  //handle the upload of images from cloudinary 

 uploadImage = async e => {
    // console.log('uploading image');
    const files = e.target.files;
    const data = new FormData(); //USE JS data api
    data.append('file', files[0]);
    data.append('upload_preset', 'reactstore') //needed to connect to cloudinary

    //hit the cloudinary api..can change info on cloudinary settings page
    const res = await fetch('https://api.cloudinary.com/v1_1/reactstore/image/upload', {
      method: 'POST',
      body: data
    });
    //parse the data that comes back into json
    const file = await res.json();
    // console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }


  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
        <Form onSubmit={async e => {
          e.preventDefault();
          //call the mutation function
          const res = await createItem();
          //route to single page of created item
          Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id }
          })
        }}> 
        <Error error={error} />
          {/* use fieldset here b/c you can grey it out while loading aria for accessability apollo will turn loading to true or false for us */}
          <fieldset disabled={loading} aria-busy={loading}> 

          <label htmlFor="image">
            Image
            <input 
              type="file" 
              id="file" 
              name="file" 
              placeholder="Upload an Image" 
              required 
              // value={this.state.image} 
              onChange={this.uploadImage}
            />
          </label> 

          <label htmlFor="title">
            Title
            <input 
              type="text" 
              id="title" 
              name="title" 
              placeholder="Title" 
              required 
              value={this.state.title} 
              onChange={this.handleChange}
            />
          </label> 

          <label htmlFor="price">
            Price
            <input 
              type="number" 
              id="price" 
              name="price" 
              placeholder="Price" 
              required 
              value={this.state.price} 
              onChange={this.handleChange}
            />
          </label> 

          <label htmlFor="description">
            Description
            <textarea
              id="description" 
              name="description" 
              placeholder="Enter a Description" 
              required 
              value={this.state.description} 
              onChange={this.handleChange}
            />
          </label> 
          <button type="submit">Submit</button>
          </fieldset>
        </Form>
        )}
      </Mutation>
      
    )
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
