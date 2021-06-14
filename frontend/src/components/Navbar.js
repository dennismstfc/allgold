import logo from '../icons/allgold-logo.png'
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
    
        <nav>
            <Link to='/'>
                <img src={logo} alt="allgold logo" className="logo"/>
            </Link>
        </nav>
      );
}
 
export default Navbar;