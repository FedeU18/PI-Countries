import './App.css';
import {Route, Switch} from 'react-router-dom'
import LandingPage from '../src/Components/LandingPage/LandingPage'
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import Create from './Components/Create/Create';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={LandingPage}/>
        <Route path='/home' exact>
          <Home />
        </Route>
        <Route exact path='/home/:id' component={Detail}/>
        <Route exact path='/create' component={Create}/>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
