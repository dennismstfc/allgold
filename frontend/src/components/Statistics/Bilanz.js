import LastSales from './LastSales';
import TopSellers from './TopSellers';

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
        </div>
     );
}
 
export default Bilanz;