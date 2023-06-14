import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveProduct } from '../../services/storageCart';
import '../StyleSheet/Card.css';

class Card extends React.Component {
  handleClick = () => {
    const { produto, handleAmount } = this.props;
    saveProduct(produto);
    handleAmount();
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  }

  render() {
    const { title, price, thumbnail, id, freeShipping } = this.props;
    return (
      <div className="marg">

        <div
          role="button"
          onClick={ this.handleClick }
          onKeyDown={ this.handleKeyDown }
          tabIndex={ 0 }
          className="product-container card"
          data-testid="product"
        >
          <Link
            className="product"
            data-testid="product-detail-link"
            to={ `/produto/${id}` }
          >
            <img className="image" alt={ thumbnail } src={ thumbnail } />
            <span className="title">{title}</span>
            <span className="price">{`R$ ${price}`}</span>
            {freeShipping && <span className="free-shipping">Frete grátis</span>}
          </Link>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  produto: PropTypes.shape().isRequired,
  handleAmount: PropTypes.func.isRequired,
  freeShipping: PropTypes.bool.isRequired,
};

export default Card;
