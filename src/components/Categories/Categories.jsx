import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../../services/api';
import '../StyleSheet/Categories.css';

class Categories extends React.Component {
  state = {
    categoryList: [],
  }

  async componentDidMount() {
    const response = await getCategories();
    this.setState({ categoryList: response });
  }

  render() {
    const { handleApertar } = this.props;
    const { categoryList } = this.state;
    return (
      <div>

        <div className="sidebar">
          {/* <h3>Categorias</h3> */}
          <ul className="nav-links">
            {
              categoryList.map(({ id, name }) => (
                <li key={ id } htmlFor={ id } data-testid="category">
                  <input
                    id={ id }
                    type="radio"
                    value={ name }
                    name="categories"
                    className="link_name"
                    onClick={ handleApertar }
                  />
                  { name }
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  handleApertar: PropTypes.func.isRequired,
};

export default Categories;
