/**
 *
 * Name: Icon
 * Desc: Render Icon with name. Make sure to put icon in svgSprite file in dir /assets.
 *
 * @param {string} name
 * @param {string} color
 * @param {int} size
 * 
 */
 
import PropTypes from 'prop-types';

import Icons from '../../assets/svgSprite.svg'; // Path to your icons.svg

const Icon = ({ name, color, size, ...rest }) => (
  <svg className={`icon icon-${name}`} fill={color} width={size} height={size} { ...rest }>
    <use xlinkHref={`${Icons}#icon-${name}`} { ...rest }/>
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

export default Icon;


