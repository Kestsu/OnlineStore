import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

class ListProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 0,
      productsPerPage: 10,
      products: [],
    };
  }

  componentDidMount() {
    const { produtos } = this.props;
    const { productsPerPage, currentPage } = this.state;
    const totalProducts = produtos.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    this.setState({ totalPages });

    this.loadProducts(currentPage);
  }

  loadProducts = (page) => {
    const { produtos } = this.props;
    const { productsPerPage } = this.state;
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsOnPage = produtos.slice(start, end);
    this.setState({ products: productsOnPage });
  };

  handlePageClick = (page) => {
    this.setState({ currentPage: page });
    this.loadProducts(page);
  };

  renderPagination = () => {
    const { currentPage, totalPages } = this.state;
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i + 1) {
      paginationItems.push(
        <li key={ i } className={ `page-item ${currentPage === i ? 'active' : ''}` }>
          <button
            type="button"
            className="page-link"
            onClick={ () => this.handlePageClick(i) }
          >
            {i}
          </button>
        </li>,
      );
    }
    return (
      <ul className="pagination">
        {paginationItems}
      </ul>
    );
  };

  renderCards = () => {
    const { products } = this.state;
    return products.map((item) => (
      <Card
        id={ item.id }
        key={ item.id }
        price={ item.price }
        title={ item.title }
        thumbnail={ item.thumbnail }
        produto={ item }
        handleAmount={ this.handleAmount }
        freeShipping={ item.shipping.free_shipping }
      />
    ));
  };

  render() {
    return (
      <div>
        <ul>
          {this.renderCards()}
        </ul>

        {this.renderPagination()}
      </div>
    );
  }
}

ListProducts.propTypes = {
  produtos: PropTypes.string.isRequired,
};

export default ListProducts;
