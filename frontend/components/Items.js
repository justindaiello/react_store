import React, { Component } from 'react';
import { Query } from 'react-apollo'; //query directly into this component
import gql from 'graphql-tag'; //get access to graph ql queries
import { log } from 'async';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

//query Apollo recommends putting queries in the actual file you are using them in rather than another file. Good practice to put all queries in all caps
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(
      first: $first,
      skip: $skip,
      orderBy: createdAt_DESC
      ) {
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
  max-width: 1000px;
  margin: 0 auto;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  @media (max-width: 700px) {
    grid-template-columns: 1fr; 
  }
`;

//use the query via render prop which keeps you from having to deal with higher order components like in redux 

class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
          <Query 
            query={ALL_ITEMS_QUERY}
            variables={{
              skip: this.props.page * perPage - perPage,
              first: perPage
            }}>
          {/* payload destructured/render prop*/}
            {({ data, error, loading }) => {
              if (loading) return <p>Loading..</p>;
              if (error) return <p>Error: {error.message}</p>;
              return <ItemsList>
                {data.items.map(item => <Item item={item} key={item.id}/>)}
              </ItemsList>
            }}
          </Query>
        <Pagination page={this.props.page} />
      </Center>
    )
  }
}

export default Items;
export { ALL_ITEMS_QUERY }; //export so we can use this query for delete component
