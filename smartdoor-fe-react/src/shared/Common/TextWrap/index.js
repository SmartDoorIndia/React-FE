
import { Col } from 'react-bootstrap';
import Text from '../../Text/Text';

const TextWrap = ({ text, subText, lg, md, col }) => {

	return (
		<Col lg={ lg || 4 } md={ md || 4 } col={ col || 12 }>
			<Text
	          size="xSmall"
	          fontWeight="smbold"
	          color="TaupeGrey"
	          text={ text }
	        />
            <Text
              size="Small"
              fontWeight="mediumbold"
              color="secondaryColor"
              text={ subText }
              className="mt-1"
            />
        </Col>
    );
}


export default TextWrap;

