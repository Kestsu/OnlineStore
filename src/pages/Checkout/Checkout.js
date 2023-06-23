import React from "react";
import { Link } from "react-router-dom";
import FormCheckout from "../../components/FormCheckout/FormCheckout";
import { readSavedProducts } from "../../services/storageCart";
import "../StyleSheet/Checkout.css";

class Checkout extends React.Component {
  state = {
    isFinished: false,
    filteredProducts: [],
    products: [],
    totalPrice: 0,
    userInfo: {
      nome: "",
      cpf: "",
      email: "",
      tel: "",
      cep: "",
      endereco: "",
      complemento: "",
      numero: "",
      cidade: "",
      estado: "",
    },
    payOption: "",
    creditCard: "",
  };

  componentDidMount() {
    const products = readSavedProducts();
    const filteredProducts = this.filterProducts(products);
    const totalPrice = this.calculateTotalPrice(products);
    this.setState({ products, filteredProducts, totalPrice });
  }

  filterProducts = (products) =>
    products
      .map((produto) => JSON.stringify(produto))
      .filter((produto, index, self) => self.indexOf(produto) === index)
      .map((produto) => JSON.parse(produto));

  calculateTotalPrice = (products) =>
    products.reduce((accPrice, { price }) => {
      let novoAcc = accPrice;
      novoAcc += price;
      return novoAcc;
    }, 0);

  handleChangeInfos = ({ target: { value, name } }) => {
    this.setState((prevState) => ({
      userInfo: { ...prevState.userInfo, [name]: value },
    }));
  };

  handleChangePayment = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => {
      const { payOption } = this.state;
      if (payOption === "Boleto") {
        this.setState({ creditCard: "" });
      }
    });
  };

  handleClick = () => {
    this.setState({ isFinished: true });
    localStorage.setItem('produtosCarrinho', JSON.stringify([]));
  };


  render() {
    const {
      products,
      filteredProducts,
      totalPrice,
      userInfo,
      payOption,
      isFinished,
    } = this.state;
    return (
      <div>
        {isFinished ? (
          <section className="container-finish-message">
            <nav className="container-navigation-links">
              <div>
                <h1>OnlineStore</h1>
                <Link to="/" className="link-home">
                  {"< Home"}
                </Link>
              </div>
            </nav>
            <section className="container-payment-sucess">

            <h1>Compra realizada com sucesso!</h1>
            <h3>Obrigado pela preferência! :D</h3>
            <div>
              <Link to="/">
                <button className="return-button finalizar-button" type="button">
                  <span>
                    Continuar comprando
                    </span>
                  <div className="custom-top" />
                  <div className="custom-left" />
                  <div className="custom-bottom" />
                  <div className="custom-right" />
                </button>
              </Link>
            </div>
            </section>
          </section>
        ) : (
          <main>
            <nav className="container-navigation-links">
              <div>
                <h1>OnlineStore</h1>
                <Link to="/" className="link-home">
                  {"< Home"}
                </Link>
              </div>
              <Link to="/carrinho" className="link-cart">
                Voltar para carrinho
              </Link>
            </nav>
            <section className="container-product-list">
              <header className="header-produto-list">
                <h1>Revise seu Produtos</h1>
                <hr />
              </header>
              <tbody className="tbody-produto-list">
                {filteredProducts.map(({ title, price, thumbnail, id }) => (
                  <div className="container-product-review" key={id}>
                    <div>
                      <img src={thumbnail} alt={thumbnail} />
                      <h3>{title}</h3>
                    </div>
                    <div className="container-checkout-value">
                      <p>
                        {`Qtd: ${
                          products.filter(
                            ({ id: idProduto }) => idProduto === id
                          ).length
                        }`}
                      </p>
                      <p>{`R$ ${price.toFixed(2)}`}</p>
                    </div>
                  </div>
                ))}
              </tbody>
              <h4 className="totalPrice">{`Total: R$ ${totalPrice.toFixed(
                2
              )}`}</h4>
            </section>
            <section className="section-payments">
              <section className="container-info-user">
                <h2>Informações do Comprador</h2>
                <hr />
                <FormCheckout
                  userInfo={userInfo}
                  handleChange={this.handleChangeInfos}
                />
                <button
                  id="btn-pay"
                  className="finalizar-button"
                  type="button"
                  onClick={this.handleClick}
                >
                  <span>Comprar</span>
                  <div className="custom-top" />
                  <div className="custom-left" />
                  <div className="custom-bottom" />
                  <div className="custom-right" />
                </button>
              </section>
              <section className="container-pay-method">
                <h2>Método de Pagamento</h2>
                <hr />
                <div className="container-pay-options">
                  <label htmlFor="boletoRadio">
                    <input
                      id="boletoRadio"
                      type="radio"
                      name="payOption"
                      value="Boleto"
                      onChange={this.handleChangePayment}
                    />
                    Boleto
                  </label>
                  <label htmlFor="creditoRadio">
                    <input
                      id="creditoRadio"
                      type="radio"
                      name="payOption"
                      value="Crédito"
                      onChange={this.handleChangePayment}
                    />
                    Cartão de Crédito
                  </label>

                  <div>
                    {payOption === "Crédito" && (
                      <section className="container-creditCard">
                        {/* <label htmlFor="visaRadio">
                          <input
                            id="visaRadio"
                            type="radio"
                            name="creditCard"
                            value="Visa"
                            checked={creditCard === "Visa"}
                            onChange={this.handleChangePayment}
                          />
                          Visa
                        </label>
                        <label htmlFor="masterRadio">
                          <input
                            id="masterRadio"
                            type="radio"
                            name="creditCard"
                            value="MasterCard"
                            checked={creditCard === "MasterCard"}
                            onChange={this.handleChangePayment}
                          />
                          MasterCard
                        </label>
                        <label htmlFor="eloRadio">
                          <input
                            id="eloRadio"
                            type="radio"
                            name="creditCard"
                            value="Elo"
                            checked={creditCard === "Elo"}
                            onChange={this.handleChangePayment}
                          />
                          Elo
                        </label> */}

                        <form>
                          <div class="form-group">
                            <label class="form-label" for="card-number">
                              Número do Cartão:
                            </label>
                            <input
                              class="form-input"
                              type="text"
                              id="card-number"
                              name="card-number"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label class="form-label" for="card-name">
                              Nome do Titular:
                            </label>
                            <input
                              class="form-input"
                              type="text"
                              id="card-name"
                              name="card-name"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label class="form-label" for="expiry-date">
                              Data de Validade:
                            </label>
                            <input
                              class="form-input"
                              type="text"
                              id="expiry-date"
                              name="expiry-date"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label class="form-label" for="cvv">
                              CVV:
                            </label>
                            <input
                              class="form-input"
                              type="text"
                              id="cvv"
                              name="cvv"
                              required
                            />
                          </div>
                          <button class="form-button" type="submit">
                            Cadastrar
                          </button>
                        </form>
                      </section>
                    )}
                  </div>
                </div>
              </section>
            </section>
          </main>
        )}
      </div>
    );
  }
}

export default Checkout;
