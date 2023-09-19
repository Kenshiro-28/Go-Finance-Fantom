import React from 'react';  
import ReactDOM from 'react-dom';  
import {HashRouter as Router, Route, NavLink, Routes} from 'react-router-dom'   
import 'bootstrap/dist/css/bootstrap.css'

import Home from './components/Home';
import Farm from './components/Farm';
import ChoHan from './components/ChoHan';
import Ginko from './components/Ginko';
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
			   <NavLink to="/cho-han" exact>丁半 Chō-Han</NavLink>
		   </div>		   
		   
   		   <div className="col-sm">
			   <NavLink to="/ginko" exact>銀行 Ginkō</NavLink>  
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
                <Route path="/cho-han" element={<ChoHan/>} />                
                <Route path="/ginko" element={<Ginko/>} />                
                <Route path="/vault" element={<Vault/>} />    
                <Route path="/about" element={<About/>} />  
                <Route path="*" element={<Notfound/>} />  
            </Routes>  
        </div>  
    </Router> 
)  

ReactDOM.render(routing, document.getElementById('root'));

