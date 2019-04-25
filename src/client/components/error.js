import React from 'react';
import PropTypes from 'prop-types';

const error = ({ children }) => <div className="error message">{children}</div>;

error.propTypes = {
  children: PropTypes.node.isRequired,
};

export default error;
