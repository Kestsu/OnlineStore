import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PreviousEvaluations extends Component {
  render() {
    const { evaluations } = this.props;
    return (
      <div style={ { display: 'flex', flexDirection: 'column', marginBottom: '100px' } }>
        {
          evaluations.map(({ email, rating, message }) => (
            <div key={ email }>
              <span>{email}</span>
              <span>{rating}</span>
              <p>{message}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

PreviousEvaluations.propTypes = {
  evaluations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default PreviousEvaluations;
