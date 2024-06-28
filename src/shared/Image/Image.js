/** @format */

import PropTypes from 'prop-types';
import React from 'react';
import style from './Image.scss';

/**
 * Name:Image
 * Desc: Render image
 * @param {string} src
 * @param {string} name
 * @param {string} className
 * @param {string} alt
 */
const Image = ({ src, name, className = '', alt, ...rest }) => {
  return (
    <figure className={ style.imgFigure }>
      <img src={ src } name={ name } className={ className } alt={ alt || name } { ...rest }></img>
    </figure>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
