import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import TitleStyles from './styles/TitleStyles';
import ItemStyles from './styles/ItemStyles';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';


export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  handleShortenDescription = (description, length) => {
    if (description.length <= length) {
      return description
    }
    return description.substr(0, length) + '....'
  }

  render() {
    const { item } = this.props;

    return (
      <ItemStyles>
        {/* check if there is an item image. if true return the image */}
        {item.image ? <img src={item.image} alt={item.title} /> : null}
        <TitleStyles>
          <Link href={{
            pathname: '/item',
            query: { id: item.id }
          }}>
            <a>{item.title} - {formatMoney(item.price)}</a>
          </Link>
        </TitleStyles>
        <p>{this.handleShortenDescription(item.description, 60)}</p>
        <div className="buttonList">
          <Link href={{
            pathname: 'update',
            query: { id: item.id }
          }}>
            <button>Edit ✏️</button>
          </Link>
          <AddToCart id={item.id} />
          <DeleteItem id={item.id} />
        </div>
      </ItemStyles>
    )
  }
}
