import React from 'react';
import PropTypes from 'prop-types';

const loading = ({ color, size }) => {
  const style = {
    backgroundColor: '#6ca6fd',
    width: 40,
    height: 40,
  };

  if (typeof color !== typeof undefined) {
    style.color = color;
  }
  if (typeof size !== typeof undefined) {
    style.width = size;
    style.height = size;
  }

  return <div className="bouncer" style={style} />;
};

loading.defaultProps = {
  color: '#000',
  size: 40,
};

loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default loading;
