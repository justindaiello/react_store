import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns'; //similar to momentjs
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

class Order extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render() {
    return (
      <Query 
        query={SINGLE_ORDER_QUERY}
        variables={{ id: this.props.id}}
      >
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          const order = data.order;
          return (
            <OrderStyles>
              <Head>
                <title>GoAdventure - Order: {order.id}</title>
              </Head>
              <p>
                <span>Order ID:</span>
                <span>{this.props.id}</span>
              </p>

              <p>
                <span>Item Count</span>
                <span>{order.items.length}</span>
              </p>

              <p>
                <span>Charge</span>
                <span>{order.charge}</span>
              </p>

              <p>
                <span>Date</span>
                <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
              </p>

              <p>
                <span>Order Total</span>
                <span>{formatMoney(order.total)}</span>
              </p>

            <div className="items">
              {order.items.map(item => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h2>{item.title}</h2>
                    <h2>Quantity: {item.quantity}</h2>
                    <h2>Each: {formatMoney(item.price)}</h2>
                    <h2>Subtotal: {formatMoney(item.price * item.quantity)}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            </OrderStyles>
          )
        }}
      </Query>
    )
  }
}

export default Order;
