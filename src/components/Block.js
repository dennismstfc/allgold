import test from '../images/placeholder.png'
import arrowIcon from '../icons/arrow.svg'

const Block = (props) => {
    return ( 
        <div className="box">
            <img src={test} alt="" className="preview-image"/>
            <p>
                {props.title}
                <img src={arrowIcon} alt=""/>
            </p>
        </div>

     );
}
 
export default Block;