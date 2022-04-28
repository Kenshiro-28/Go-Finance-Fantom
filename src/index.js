import React from 'react';  
import ReactDOM from 'react-dom';  
import {HashRouter as Router, Route, NavLink, Routes} from 'react-router-dom'   
import 'bootstrap/dist/css/bootstrap.css'

import Home from './components/Home';
import Farm from './components/Farm';
import Ginko from './components/Ginko';
import ShogunPool from './components/ShogunPool';
import ReiPool from './components/ReiPool';
import KiPool from './components/KiPool';
import Vault from './components/Vault';
import About from './components/About';

import './go_finance.css';  

const Notfound = () => <div><br/><p/><h1>Invalid URL</h1><br/><p/></div>

const routing = (  
    <Router>  
        <div className="row navigation_bar">
        
           <div className="col-sm">
			   <NavLink to="/" exact>家 Home</NavLink>  
		   </div>
			 
		   <div className="col-sm">
			   <NavLink to="/farm" exact>合 Gō Farm</NavLink>  
		   </div>
		   
   		   <div className="col-sm">
			   <NavLink to="/ginko" exact>銀行 Ginkō</NavLink>  
		   </div>
		   
 		   <div className="col-sm-2">
			   <NavLink to="/shogun" exact>将軍 Shōgun Pool</NavLink>  
		   </div>
		   
   		   <div className="col-sm">
			   <NavLink to="/rei" exact>霊 Rei Pool</NavLink>  
		   </div>
		   
   		   <div className="col-sm">
			   <NavLink to="/ki" exact>気 Ki Pool</NavLink>  
		   </div>
		   
		   <div className="col-sm">
			   <NavLink to="/vault" exact>金庫 Vault</NavLink>  
		   </div>
		   
		   <div className="col-sm">
			   <NavLink to="/about" exact>情報 About</NavLink>  
		   </div>
		   
	    </div>
        <div>  
            <Routes>  
                <Route path="/" element={<Home/>} />
                <Route path="/farm" element={<Farm/>} />
                <Route path="/ginko" element={<Ginko/>} />                
                <Route path="/shogun" element={<ShogunPool/>} />
                <Route path="/rei" element={<ReiPool/>} />
                <Route path="/ki" element={<KiPool/>} />
                <Route path="/vault" element={<Vault/>} />    
                <Route path="/about" element={<About/>} />  
                <Route path="*" element={<Notfound/>} />  
            </Routes>  
        </div>  
    </Router> 
)  

ReactDOM.render(routing, document.getElementById('root'));

