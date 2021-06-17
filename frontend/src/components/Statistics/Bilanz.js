import LastSales from './LastSales';
import TopSellers from './TopSellers';
import TopSellersDoughnutChart from './TopSellersDoughnutChart';

const Bilanz = () => {
    return (
        <div className="main">
            <p className="home-headline">Bilanz</p>
            <LastSales/>
            <br/>
            <br/>
            <br/>
            <br/>
            <TopSellers/>
            <TopSellersDoughnutChart /> 
        </div>
     );
}
 
export default Bilanz;