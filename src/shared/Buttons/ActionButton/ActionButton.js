/**
 *
 * Name: ActionButton
 * Desc: Render Button with icon to do some action or navigation
 *
 * @param {string} link
 * @param {string} icon
 * @param {string} iconClass
 * @param {int} iconsSize
 * @param {string} iconColor
 * @param {string} tooltipName
 * @param {string} tooltipPosition
 * @param {boolean} disableTooltip
 * @param {ReactChildren<Component>} children 
 * 
 */

import './ActionButton.scss';

import { memo } from 'react';

import { Link } from 'react-router-dom';

import Icon from '../../Icon/Icon';
import { ToolTip } from '../../../common/helpers/Utils';

const ActionButton = ({ 
    link, 
    icon, 
    iconClass, 
    iconsSize, 
    iconColor, 
    tooltipName, 
    tooltipPosition,
    disableTooltip,
    children,
    iconOnly,
    ...rest
}) => {

	return (
        <div className={ !iconOnly ? "datatableActionButton" : "" }>
          <ToolTip 
            position={ tooltipPosition || "left" } 
            name={ tooltipName } 
            disable={ !tooltipName || disableTooltip ? true : false }>
            <Link to={link} >
              <span data-tag="allowRowEvents">

                { 
                  icon ?
                    <Icon 
                      name={icon} 
                      className={iconClass} 
                      color={iconColor || "#000000"} 
                      size={ iconsSize || 16 } 
                      { ...rest } />
                  : null
                }

                { children }
              </span>
            </Link>
          </ToolTip>
        </div>        
		);
}

export default memo(ActionButton);


