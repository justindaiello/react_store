import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;


class DeleteItem extends Component {
  //apollo gives you two things when you access update access to the cache and the payload/date from the item that got deleted
  update = (cache, payload) => {
    // manually update cache on the client so that it matches the server
    //read the cache for the items we want 
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log(data);
    //filter the delete item out of the page
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    //put items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data: data});
    
  }
  
  render() {
    return (
      <Mutation 
        mutation={DELETE_ITEM_MUTATION} 
        variables={{ id: this.props.id }}
        // refresh page upon delete
        update={this.update}
        >
        {(deleteItem, { error }) => (
          <button onClick={() => {
            if(confirm('Are you sure you wish to delete this item?')) {
              deleteItem();
            }
          }}>
          Delete</button>
        )}
      </Mutation>
    )
  }
}

export default DeleteItem;
