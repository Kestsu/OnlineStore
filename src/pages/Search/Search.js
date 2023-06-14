import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { categoriaSearch, termo } from '../../services/api';
import Card from '../../components/Card/Card';
import Categories from '../../components/Categories/Categories';
import '../StyleSheet/Search.css';
import { readSavedProducts } from '../../services/storageCart';
// import ListProducts from '../../components/ListProducts/ListProducts';

class Search extends React.Component {
  state = {
    isLoading: false,
    inputValue: 'acessorios',
    produtos: [],
    totalCarrinho: 0,
    typePrice: 'Recente',
    categoria: '',
  };

  // Altera a quantidade que aparece do lado do carrinho quando abrir a pagina
  componentDidMount() {
    this.handleAmount();
    this.handleClick();
  }

  // Altera a quantidade que aparece do lado do carrinho
  handleAmount = () => {
    const total = readSavedProducts().length;
    this.setState({
      totalCarrinho: total,
    });
  }

  // Controla campo de pesquisa
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // Alterar categoria e atualizar a pagina
handleCategory = (event) => {
  const ideia = event.target.id;
  this.setState({
    categoria: ideia,
  }, () => { this.handleClick('naoQuery'); });
}

  // Realiza pesquisa a partir do campo de pesquisa e categorias
  handleClick = (type) => {
    const { inputValue, categoria } = this.state;
    this.setState({ isLoading: true }, async () => {
      if (type === 'naoQuery' && inputValue.length !== 0) {
        const APIResponse = await categoriaSearch(
          categoria,
        );
        const response = APIResponse.results;
        this.handlePrint(response);
      } else {
        const APIResponse = await termo(
          inputValue,
        );
        const response = APIResponse.results;
        this.handlePrint(response);
      }

      this.setState({ isLoading: false });
    });
  };

  // Ordenar os valores e imprimir na tela
  handlePrint = (response) => {
    const { typePrice } = this.state;
    if (typePrice === 'Recente') {
      this.setState({ produtos: response });
    }
    if (typePrice === 'Mais caro') {
      const numero = -1;
      const retorno = response.sort((a, b) => {
        if (a.price > b.price) {
          return numero;
        }
        return true;
      });
      this.setState({ produtos: retorno });
    }
    if (typePrice === 'Mais barato') {
      const numero = -1;
      const retorno = response.sort((a, b) => {
        if (a.price < b.price) {
          return numero;
        }
        return true;
      });
      this.setState({ produtos: retorno });
    }
  }

// Definir no estado a ordem dos valores
handlePrice = ({ target }) => {
  const valor = target.value;
  this.setState({
    typePrice: valor,
  });
  this.handleClick();
}

render() {
  const { inputValue, produtos, totalCarrinho, typePrice, isLoading } = this.state;
  return (
    <div className="main-container">
      <header className="header-container">
        <h1>OnlineStore</h1>
        <div className="search-container">
          <div className="control-search">
            <input
              type="text"
              data-testid="query-input"
              className="input-search"
              name="inputValue"
              value={ inputValue }
              onChange={ this.handleChange }
            />

            <button
              data-testid="query-button"
              className="btn-search"
              onClick={ this.handleClick }
              type="button"
            >
              Pesquisar
            </button>
          </div>
          {/* LINK PARA CARRINHO DE COMPRAS */}
          <Link
            to="/carrinho"
            data-testid="shopping-cart-button"
            className="link-cart"
          >
            <span>Carrinho de compras</span>
            <span data-testid="shopping-cart-size">{ `${totalCarrinho} >` }</span>
          </Link>
        </div>
      </header>
      <section className="home-section">
        {/* CAMPO DE PESQUISA E BOTÃO */}
        {/* LISTAGEM DE PRODUTOS */}
        <Categories handleApertar={ this.handleCategory } />
        <article className="product-conteiner">
          <select
            className="select-options"
            name="typePrice"
            value={ typePrice }
            onChange={ this.handlePrice }
          >
            <option value="Recente">Recente</option>
            <option value="Mais caro">Mais caro</option>
            <option value="Mais barato">Mais barato</option>
          </select>
          <div className="product-list">
            {
              isLoading ? <h1>Carregando...</h1> : (
                produtos.map((itens) => (
                  <Card
                    id={ itens.id }
                    key={ itens.id }
                    price={ itens.price }
                    title={ itens.title }
                    thumbnail={ itens.thumbnail }
                    produto={ itens }
                    handleAmount={ this.handleAmount }
                    freeShipping={ itens.shipping.free_shipping }
                  />
                ))
                // <ListProducts produtos={ produtos } />
              )
            }
          </div>
        </article>
      </section>
    </div>
  );
}
}
Search.prototypes = {
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Search;
