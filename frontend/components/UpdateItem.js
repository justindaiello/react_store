import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo'; //allow us to push/change data
import gql from 'graphql-tag'; //access gql queries
import Router from 'next/router'; //to route to single page on form submit
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';


//query for single item 
// run it against the DB with our item query
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

// use update item mutation from the backend schema.graphql
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
) {
  updateItem(
    id: $id
    title: $title
    description: $description
    price: $price
  ) {
    id
    title
    description
    price
  }
}
`;

class UpdateItem extends Component {

  // only putting things into state that have changed so this can be a blank object
  state = { };

  //this.setState({ [e.target.id]: e.target.value }) isnt good enough for this case.
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value; //prevents quotes
    this.setState({ [name]: val });
  }

  //submit handler to update item
  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    // console.log('updating item!');
    // console.log(this.state);
    const response = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      },
    });
    console.log('updated!!')
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({data, loading}) => {
          if (loading) return <p>Loading...</p>;
          {/* avoid returning null if ID is wrong in url */}
          if (!data.item) return <p>This item does not exist</p>
          return (
        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
          {(updateItem, { loading, error }) => (
          <Form onSubmit={e => this.updateItem(e, updateItem)}> 
          <Error error={error} />
            {/* use fieldset here b/c you can grey it out while loading aria for accessability apollo will turn loading to true or false for us */}
            <fieldset disabled={loading} aria-busy={loading}> 

            <label htmlFor="title">
              Title
              <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="Title" 
                required 
                defaultValue={data.item.title} 
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
                defaultValue={data.item.price} 
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
                defaultValue={data.item.description} 
                onChange={this.handleChange}
              />
            </label> 
            <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
            </fieldset>
          </Form>
          )}
        </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
