/**
 * Name: TextArea
 * Desc: Render basic html TextArea
 * @param {string} id
 * @param {string} label
 * @param {ReactComponent || HTML} children
 * @param {string} error
 * @param {string} rows
 * @param {rest} object
 *
 */
import '../Input/Input.scss';

import { memo, useEffect, forwardRef } from 'react';

import Text from '../../Text/Text';

const TextArea = forwardRef(({
	id,
	label,
	children,
	error,
	className,
	rows,
	maxLength,
	...rest
}, ref) => {
	let eleId = id || label || "sdFormControlTextarea"+Math.random();

	const _charCount = (event) => {
		const limitEle = document.getElementById('textAcharLimit');
	    const target = event.currentTarget;
	    const currentLength = target.value.length;		    
	    limitEle.innerHTML = `${currentLength}/500`;
	}


	useEffect(()=>{
		const textarea = document.getElementById(eleId);

		if ( textarea && maxLength ) textarea.addEventListener("input", _charCount);

		return () => { textarea && textarea.removeEventListener("input", _charCount) }
	},[eleId, maxLength])


	return (
		<div className="sdInputFields positionLimit"> 
	        <label htmlFor={ eleId } className="form-label">
	           { label }
	        </label>
	        <textarea
	        	id={ eleId }
	        	className={ `textArea ${className || ""}` }
	        	rows={ rows || "3" }
	        	maxLength={ maxLength || 5000 } 
	        	{ ...rest }>
	        		{ children }
	        	</textarea>
	        	{ maxLength && <span className="limitChar" id="textAcharLimit">0/{maxLength}</span> }
	        { error && <Text color="dangerText" size="xSmall" text={ error } /> }
		</div>
	);
});

export default memo(TextArea);