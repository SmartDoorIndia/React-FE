/**
 * Name: Text
 * Desc: Render Text
 *
 * @param {string} text
 * @param {string} className
 * @param {string} color
 * @param {string} fontWeight
 * @param {string} fontSize
 * @param {object} style
 *
 */

const Text = ({ size, color, fontWeight, className, text, ...rest }) => {
  const name = `${ size || '' } ${ color || '' } ${ fontWeight || '' } ${ className || '' } ${ 'text' } `;

  return (
    <>
      <span className={ name } { ...rest }>
        {text}
      </span>
    </>
  );
};

export default Text;

