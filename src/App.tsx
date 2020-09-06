import * as React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import ClassDefault from './ClassDefault';
import { ClassNamed } from './ClassNamed';
import FunctionDefault from './FunctionDefault';
import { FunctionNamed } from './FunctionNamed';
import SignIn from './SignIn';
import SignUp from './SignUp';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
    return (
        <div>
            <Navigation />
            <Main />
        </div>
    );
}

const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink activeClassName="current" to='/'>Home</NavLink></li>
            <li><NavLink activeClassName="current" to='/signin'>Sign In</NavLink></li>
            <li><NavLink activeClassName="current" to='/signup'>Sign Up</NavLink></li>
        </ul>
    </nav>
);

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/signin' component={SignIn}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
    </Switch>
);


const Home = () => {
    const activateLasers = () =>  {
        alert("Here");
    }
    return(
        <div className='home'>
            <h1>Welcome to my asd portfolio website</h1>

            <ClassDefault />
            <ClassNamed />
            {/* <FunctionDefault /> */}
            <FunctionNamed />
            <React.Suspense fallback={<h1>Loading</h1>}>
                <LazyComponent />
            </React.Suspense>

            <button onClick={activateLasers}> Activate Lasers </button>
        </div>
    );
}

export default App;