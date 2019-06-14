import React, { Component } from 'react';
import { Query } from 'react-apollo'; //query directly into this component
import gql from 'graphql-tag'; //get access to graph ql queries
import { log } from 'async';
import styled from 'styled-components';
import Item from './Item'

//query Apollo recommends putting queries in the actual file you are using them in rather than another file. Good practice to put all queries in all caps
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price 
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

//use the query via render prop which keeps you from having to deal with higher order components like in redux 

export default class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
        {/* payload destructured/render prop*/}
          {({ data, error, loading }) => {
            if (loading) return <p>Loading..</p>;
            if (error) return <p>Error: {error.message}</p>;
            return <ItemsList>
              {data.items.map(item => <Item item={item} key={item.id}/>)}
            </ItemsList>
          }}
        </Query>
      </Center>
    )
  }
}
