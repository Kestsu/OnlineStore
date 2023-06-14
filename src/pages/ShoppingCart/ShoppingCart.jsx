import React from 'react';
import { Link } from 'react-router-dom';
import {
  readSavedProducts,
  removeAllProduct,
  removeProduct,
  saveProduct,
} from '../../services/storageCart';
import '../StyleSheet/ShoppingCart.css';

class ShoopingCart extends React.Component {
  state = {
    produtos: [],
    filteredProducts: [],
    hasItems: false,
    totalPrice: 0,
  }

  componentDidMount() {
    const produtos = readSavedProducts();
    const filteredProducts = this.filterProducts(produtos);
    const totalPrice = this.calculateTotalPrice(produtos);
    if (produtos.length > 0) {
      this.setState({
        hasItems: true,
        produtos,
        filteredProducts,
        totalPrice,
      });
    }
  }

  // Calcula valor total dos produtos
  calculateTotalPrice = (products) => products
    .reduce((accPrice, { price }) => {
      let novoAcc = accPrice;
      novoAcc += price;
      return novoAcc;
    }, 0);

  // Filtra os produtos para exibir na tela sem repetição
  filterProducts = (products) => products
    .map((produto) => JSON.stringify(produto))
    .filter((produto, index, self) => self.indexOf(produto) === index)
    .map((produto) => JSON.parse(produto));

  // Incrementa contagem de produtos a partir do click
  increaseQuantity = ({ target: { name: idProduct } }) => {
    const { filteredProducts, produtos } = this.state;
    const productAdd = filteredProducts.find(({ id }) => idProduct === id);
    const quantityProduct = produtos
      .filter(({ id: idProduto }) => idProduto === idProduct).length;
    if (quantityProduct < productAdd.available_quantity) {
      saveProduct(productAdd);
      this.setState((prevState) => ({
        produtos: [...prevState.produtos, productAdd],
        totalPrice: prevState.totalPrice + productAdd.price,
      }));
    }
  }

  // Decrementa contagem de produtos a partir do click
  decreaseQuantity = ({ target: { name: idProduct } }) => {
    const { filteredProducts, produtos } = this.state;
    const quantityProduct = produtos
      .filter(({ id: idProduto }) => idProduto === idProduct).length;
    const productRemove = filteredProducts.find(({ id }) => idProduct === id);
    if (quantityProduct > 1) {
      removeProduct(productRemove);
      const newCartProducts = readSavedProducts();
      const totalPrice = this.calculateTotalPrice(newCartProducts);
      this.setState({
        produtos: [...newCartProducts],
        totalPrice,
      });
    }
  }

  // Remove o produto totalmente do carrinho
  deleteProduct = ({ target: { name: idProduct } }) => {
    const { filteredProducts } = this.state;
    const productDelete = filteredProducts.find(({ id }) => idProduct === id);
    removeAllProduct(productDelete);
    const newProducts = readSavedProducts();
    const totalPrice = this.calculateTotalPrice(newProducts);
    const newFilteredProducts = this.filterProducts(newProducts);
    if (newProducts.length === 0) {
      this.setState({ hasItems: false });
    }
    this.setState({
      produtos: [...newProducts],
      filteredProducts: [...newFilteredProducts],
      totalPrice,
    });
  }

  render() {
    const { hasItems, produtos, filteredProducts, totalPrice } = this.state;
    return (
      <div className="container-details">
        <nav className="container-cartNavigation">
          <h1>OnlineStore</h1>
          <Link className="link-home" to="/">{'< Home'}</Link>
        </nav>
        <div className="container-carrinho">
          <h1>Carrinho de compras</h1>

          {
            hasItems ? (
              <section className="main-cart-container">
                <article className="container-cart-products">
                  {
                    filteredProducts.map(({ title, price, thumbnail, id }) => (
                      <div className="container-cartProduct" key={ id }>
                        <div className="container-cartImage">
                          <h3 data-testid="shopping-cart-product-name">{ title }</h3>
                          <div>

                            <button
                              className="btn-delete"
                              type="button"
                              name={ id }
                              onClick={ this.deleteProduct }
                            >
                              X
                            </button>
                            <img src={ thumbnail } alt={ thumbnail } />
                            <div className="container-quantityControl">
                              <button
                                type="button"
                                data-testid="product-decrease-quantity"
                                name={ id }
                                onClick={ this.decreaseQuantity }
                              >
                                -
                              </button>
                              <span
                                data-testid="shopping-cart-product-quantity"
                              >
                                {
                                  produtos
                                    .filter(({
                                      id: idProduto }) => idProduto === id).length
                                }
                              </span>
                              <button
                                type="button"
                                data-testid="product-increase-quantity"
                                name={ id }
                                onClick={ this.increaseQuantity }
                              >
                                +
                              </button>
                            </div>
                            <span>{ `R$ ${price.toFixed(2)}` }</span>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </article>
                <p>{ `Valor total da Compra R$ ${totalPrice.toFixed(2)}` }</p>
                <Link
                  to="/checkout"
                  data-testid="checkout-products"
                  className="checkout-link"
                >
                  Finalizar Compra
                </Link>
              </section>
            ) : (
              <h1
                data-testid="shopping-cart-empty-message"
                className="empty-cart"
              >
                Seu carrinho está vazio
              </h1>
            )
          }
        </div>
      </div>
    );
  }
}

export default ShoopingCart;
