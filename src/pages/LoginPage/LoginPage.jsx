import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
  // state = {
  //   user: '',
  //   password: '',
  // }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    // const { user, password } = this.state;
    return (
      <div>
        <input
          type="text"
          name="user"
          // id="user"
          placeholder="usuário"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          // id="password"
          placeholder="senha"
          onChange={ this.handleChange }
        />
        <input
          type="button"
          value="Entrar"
        />
        <Link to="/forgot-pass">Esqueceu sua senha?</Link>
        <Link to="/">Cadastre-se</Link>
      </div>
    );
  }
}

export default LoginPage;
