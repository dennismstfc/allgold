import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/General/Navbar';
import Home from './components/General/Home';
import VerkaufsstelleEroeffnen from './components/Stations/VerkaufsstelleEroeffnen';
import VerkaufsstellenAuflisten from './components/Stations/VerkaufsstellenAuflisten';
import VerkaufsstelleBearbeiten from './components/Stations/VerkaufsstelleBearbeiten';
import Produktverwaltung from './components/Products/Produktverwaltung';
import Bilanz from './components/Statistics/Bilanz';
import Verkaeuferverwaltung from './components/Seller/Verkaeuferverwaltung'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
         <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/verkaufsstelle-eroeffnen" component={VerkaufsstelleEroeffnen} />
          <Route path="/verkaufsstellen-auflisten" component={VerkaufsstellenAuflisten} />
          <Route path="/verkaufsstelle-bearbeiten" component={VerkaufsstelleBearbeiten} />
          <Route path='/produktverwaltung' component={Produktverwaltung} />
          <Route path='/bilanz' component={Bilanz} />
          <Route path='/verkaeuferverwaltung' component={Verkaeuferverwaltung} />
         </Switch>
      </div>
    </Router>
  );
}

export default App;
