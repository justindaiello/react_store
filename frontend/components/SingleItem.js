import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import SingleItemStyles from './styles/SingleItemStyles';
import Head from 'next/head'; //Next js has tools for side effects such as dynamically updating page title. You can have multiple heads and nextjs will work it out
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';


//query the item
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id} ) {
      id
      title
      price
      description
      largeImage
    }
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query 
        query={SINGLE_ITEM_QUERY} 
        variables={{
        id: this.props.id
        }}
      >
        {({error, loading, data}) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          if (!data.item) return <p>This item does not exist.</p>
          const item = data.item;
          return <SingleItemStyles>
            {/* next.js can pull this out and add it to the proper head tag */}
            <Head>
              <title>GoAdventure | {item.title}</title>
            </Head>
            <img src={item.largeImage} alt={item.title} />
            <div className="details">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>Price: {formatMoney(item.price)}</p>
              <AddToCart id={item.id} />

            </div>
          </SingleItemStyles>
        }}       
      </Query>
    )
  }
}

export default SingleItem;

