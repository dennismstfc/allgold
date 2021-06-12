import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import VerkaufsstelleEroeffnen from './components/VerkaufsstelleEroeffnen';
import VerkaufsstellenAuflisten from './components/VerkaufsstellenAuflisten';
import VerkaufsstelleBearbeiten from './components/VerkaufsstelleBearbeiten';
import Produktverwaltung from './components/Produktverwaltung';
import Bilanz from './components/Bilanz';


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
         </Switch>
      </div>
    </Router>
  );
}

export default App;
