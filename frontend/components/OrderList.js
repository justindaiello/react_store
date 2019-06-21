import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt 
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const Title = styled.h2`
  text-align: center;
`

const OrderUl = styled.ul`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  margin-bottom: 1rem;
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding-left: 0;
  }
`;

class OrderList extends Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data: { orders }, loading, error}) => {
          if (loading) return <p>Loading...</p>
          if (error) return <Error error={error} />
          console.log(orders)
          return (
            <div>
              <Title>You have {orders.length} orders</Title>
              <OrderUl>
                {orders.map(order =>(
                  <OrderItemStyles key={order.id}>
                    <Link href={{
                      pathname: '/order',
                      query: { id: order.id }
                    }}>
                      <a>
                        <div className="order-meta">
                          <p>
                            {order.items.reduce((item, tally) => 
                            item + tally.quantity, 0
                            )} Items
                          </p>
                          <p>{order.items.length} Products</p>
                          <p>{formatDistance(order.createdAt, new Date())}</p>
                          <p>{formatMoney(order.total)}</p>
                        </div>
                        <div className="images">
                          {order.items.map(item => (
                            <img key={item.id} src={item.image} alt={item.title} />
                          ))}
                        </div>
                      </a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </OrderUl>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default OrderList;