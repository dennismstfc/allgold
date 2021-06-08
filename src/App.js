import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import VerkaufsstelleEroeffnen from './components/VerkaufsstelleEroeffnen';
import VerkaufsstellenAuflisten from './components/VerkaufsstellenAuflisten';
import Verkaufsstellenposition from './components/Produktverwaltung';
import VerkaufstelleSuchen from './components/VerkaufstelleSuchen';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
         <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/verkaufsstelle-eroeffnen" component={VerkaufsstelleEroeffnen} />
          <Route path="/verkaufsstellen-auflisten" component={VerkaufsstellenAuflisten} />
          <Route path='/produktverwaltung' component={Verkaufsstellenposition} />
          <Route path='/verkaufsteile-suchen' component={VerkaufstelleSuchen} />
         </Switch>
      </div>
    </Router>
  );
}

export default App;
