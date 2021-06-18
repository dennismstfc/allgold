import LastSales from './LastSales';
import TopSellers from './TopSellers';
import SellerBarChart from './SellerBarChart';

const Bilanz = () => {
    return (
        <div className="main">
            <p className="home-headline">Bilanz</p>
            <LastSales/>
            <br/>
            <br/>
            <br/>
            <TopSellers/>
            <br />
            <SellerBarChart/> 
        </div>
     );
}
 
export default Bilanz;