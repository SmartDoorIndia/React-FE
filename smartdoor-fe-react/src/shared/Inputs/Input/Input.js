/**
 * Name: Input
 * Desc: Render basic html input
 * @param {string} id
 * @param {string} label
 * @param {ReactComponent || HTML} children
 * @param {string} error
 * @param {rest} object
 *
 */
import './Input.scss';

import { memo, forwardRef} from 'react';

import Form from "react-bootstrap/Form";

import Text from '../../Text/Text';

const Input = forwardRef(({
	id,
	label,
	children,
	error,
	placeholder,
	leadingIcon,
	type,
	component,
	// register,
	...rest
}, ref) => {
	let eleId = id || (label && label.replace(/\s/g, "")) || "formInput"+Math.random();

	return (
		<div className="sdInputFields">
			<Form.Group controlId={ eleId }>
				<Form.Label> { label } </Form.Label>
				<Form.Control placeholder={ !component ? placeholder || label : "" } ref={ref}  type={ type } {...rest}>
					{ children }
				</Form.Control>
				{ component && <span className="component position-absolute"> { component } </span>  }
				{ leadingIcon && <span className="leadingIcon position-absolute"> { leadingIcon.replace('"',"") } </span>}

				{ error && <Text color="dangerText" size="xSmall" text={ error } /> }
	      </Form.Group>		
		</div>

	);
});

export default memo(Input);



export const CheckBox = ({
	id,
	label,
	...rest
}) => {
	let eleId = id || (label && label.replace(/\s/g, "")) || "formInput"+Math.random();

	return (
		<div className="sdInputFields"> 
			<div className="checkBox customChechbox">
				<Form.Group controlId={ eleId }>
					<Form.Check type="checkbox" label={ label } {...rest} className='p-0' />				
				</Form.Group>
			</div>
		</div>
	);
}


