import Block from './Block';
import {Link} from 'react-router-dom';

const Home = () => {
    
    
    return (

        <div className="main">
            <p className="home-headline">Allgold Supply Center</p>
            <h4 className="home-subheadline">Stationsverwaltung</h4>
            <div className="page-wrapper">
                
                <div className="row">
                    <div className="column">
                        <Link to='/verkaufsstelle-eroeffnen'>
                            <Block  title="Verkaufsstelle eröffnen"/>
                        </Link>             
                    </div>

                    <div className="column">
                        <Link to='/verkaufsstellen-auflisten'>
                            <Block title="Verkaufstellen auflisten"/>
                        </Link>
                    </div>
                </div>
                
                <div className="row">
                    <div className="column">
                        <Link to='/verkaufsstellenposition'>
                            <Block title="Verkaufstellenpostion"/> 
                        </Link>
                    </div>
                    
                    <div className="column">
                        <Link to='/verkaufstelle-suchen'>
                            <Block title="Verkaufstelle suchen"/>
                        </Link>
                    </div>
                </div>
                
                <div className="row">
                    <div className="column">
                        <Block title="Verkaufstelle bearbeiten"/>
                    </div>
                    <div className="column">
                        <Block title="Verkaufstelle schließen"/>
                    </div>
                </div>

            </div>
        </div>
        
     );
}
 
export default Home;