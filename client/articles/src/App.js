import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import Articles from './views/Articles';
import Article from './views/Article';

import 'antd/dist/antd.css';

function App() {
    return (
        <Router>
            <div className="App">
                <ul>
                    <li>
                        <Link to="/articles">Articulos</Link>
                    </li>
                    <li>
                        <Link to="/article/create">Nuevo Articulo</Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route path="/articles" component={Articles} />
                <Route exact path="/article/create" component={Article} />
                <Route exact path="/article/:id" component={Article} />
            </Switch>
        </Router>
    );
}

export default App;
