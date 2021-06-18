import LastSales from './LastSales';
import TopSellers from './TopSellers';
import SellerBarChart from './SellerBarChart';
import StationBarChart from './StationBarChart';

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
            <br />
            <StationBarChart />
        </div>
     );
}
 
export default Bilanz;