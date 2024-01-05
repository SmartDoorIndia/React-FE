import Input from '../Input/Input';
import './SearchInput.scss';
import Image from '../../Image/Image';
import SearchIcon from '../../../assets/svg/Search.svg';

const SearchInput = ({ filterText, onFilter, onClear, placeholder, className }) => (
    <div className="searchCrossButon">
        <Input
         id="search"
         type="text"
         placeholder= {placeholder}
         aria-label="Search Input"
         value={filterText}
         onChange={onFilter}
         className ={className}  
         // leadingIcon="X"
        />
        <div className='inputSearchIcon'> 
            <Image src={SearchIcon} name="Search Icon" className="img-fluid" />    
        </div>
        {/* <button className='crossInputButton' onClick={onClear}>
         x
        </button> */}
     </div>
   );

export default SearchInput;