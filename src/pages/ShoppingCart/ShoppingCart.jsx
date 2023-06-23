import React from "react";
import { Link } from "react-router-dom";
import {
  readSavedProducts,
  removeAllProduct,
  removeProduct,
  saveProduct,
} from "../../services/storageCart";
import "../StyleSheet/ShoppingCart.css";

class ShoopingCart extends React.Component {
  state = {
    produtos: [],
    filteredProducts: [],
    hasItems: false,
    totalPrice: 0,
  };

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
  calculateTotalPrice = (products) =>
    products.reduce((accPrice, { price }) => {
      let novoAcc = accPrice;
      novoAcc += price;
      return novoAcc;
    }, 0);

  // Filtra os produtos para exibir na tela sem repetição
  filterProducts = (products) =>
    products
      .map((produto) => JSON.stringify(produto))
      .filter((produto, index, self) => self.indexOf(produto) === index)
      .map((produto) => JSON.parse(produto));

  // Incrementa contagem de produtos a partir do click
  increaseQuantity = ({ target: { name: idProduct } }) => {
    const { filteredProducts, produtos } = this.state;
    const productAdd = filteredProducts.find(({ id }) => idProduct === id);
    const quantityProduct = produtos.filter(
      ({ id: idProduto }) => idProduto === idProduct
    ).length;
    if (quantityProduct < productAdd.available_quantity) {
      saveProduct(productAdd);
      this.setState((prevState) => ({
        produtos: [...prevState.produtos, productAdd],
        totalPrice: prevState.totalPrice + productAdd.price,
      }));
    }
  };

  // Decrementa contagem de produtos a partir do click
  decreaseQuantity = ({ target: { name: idProduct } }) => {
    const { filteredProducts, produtos } = this.state;
    const quantityProduct = produtos.filter(
      ({ id: idProduto }) => idProduto === idProduct
    ).length;
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
  };

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
  };

  render() {
    const { hasItems, produtos, filteredProducts, totalPrice } = this.state;
    return (
      <div className="container-details">
        <nav className="container-cartNavigation">
          <h1>OnlineStore</h1>
          <Link className="link-home" to="/">
            {"< Home"}
          </Link>
        </nav>
        <div className="container-carrinho">
          <h1>Carrinho de compras</h1>
          <div className="content">
            <section>
              {hasItems ? (
                <div className="main-cart-container">
                  <div className="table-container">
                    <table className="container-cart-products">
                      <thead>
                        <tr>
                          <th>Produto</th>
                          <th>Quantidade</th>
                          <th>Total</th>
                          <th
                            style={{
                              width: "140px",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            -
                          </th>
                        </tr>
                      </thead>
                      <tbody className="board-orders">
                        {filteredProducts.map(
                          ({ title, price, thumbnail, id }) => (
                            <tr className="container-cartProduct" key={id}>
                              <td className="container-product-carrinho">
                                <img
                                  src={thumbnail}
                                  alt={thumbnail}
                                  style={{ width: "150px" }}
                                />
                                <h3 className="name">{title}</h3>
                              </td>
                              <td>
                                <div className="qty">
                                  <button
                                    type="button"
                                    name={id}
                                    onClick={this.decreaseQuantity}
                                  >
                                    -
                                  </button>
                                  <span>
                                    {
                                      produtos.filter(
                                        ({ id: idProduto }) => idProduto === id
                                      ).length
                                    }
                                  </span>
                                  <button
                                    type="button"
                                    data-testid="product-increase-quantity"
                                    name={id}
                                    onClick={this.increaseQuantity}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td>
                                <span>{`R$ ${price.toFixed(2)}`}</span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="custom-button"
                                  name={id}
                                  onClick={this.deleteProduct}
                                >
                                  <svg
                                    viewBox="0 0 448 512"
                                    className="custom-svgIcon"
                                  >
                                    <path
                                      d={
                                        "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3" +
                                        " 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32" +
                                        "-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163" +
                                        ".8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 4" +
                                        "67c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 4" +
                                        "6.3-19.7 47.9-45L416 128z"
                                      }
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  <aside>
                    <div className="box">
                      <header>Resumo da compra</header>
                      <div className="info">
                        <span>Sub-total</span>
                        <span>Frete Gratis</span>

                        <label htmlFor="cupom-input">
                          Cupom de Desconto:
                          <input type="text" />
                        </label>

                        <button type="button">
                          Adicionar cupom de desconto
                        </button>
                      </div>

                      <footer>
                        <span>Total</span>
                        <span>{`R$ ${totalPrice.toFixed(2)}`}</span>
                      </footer>
                    </div>
                    <button type="button" className="finalizar-button">
                      <span>
                        <Link
                          to="/checkout"
                          data-testid="checkout-products"
                          className="checkout-link"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Finalizar Compra
                        </Link>
                      </span>
                      <div className="custom-top" />
                      <div className="custom-left" />
                      <div className="custom-bottom" />
                      <div className="custom-right" />
                    </button>
                  </aside>
                </div>
              ) : (
                <h1 className="empty-cart">Seu carrinho está vazio</h1>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoopingCart;
