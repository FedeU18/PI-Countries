import './App.css';
import {Route} from 'react-router-dom'
import LandingPage from '../src/Components/LandingPage/LandingPage'
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import Create from './Components/Create/Create';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={NavBar}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/home/:id' component={Detail} />
      <Route exact path='/create' component={Create}/>
    </div>
  );
}

export default App;
