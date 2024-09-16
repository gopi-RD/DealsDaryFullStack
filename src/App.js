import {Component} from "react"
import {BrowserRouter,Route,Switch} from "react-router-dom"

import EmployeContext from "./context/EmployeContext";
import RegisterRoute from "./components/RegisterRoute";
import LoginRoute from "./components/LoginRoute";
import Home from "./components/Home";
import EmployeList from "./components/EmployeList";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class App extends Component{
    state={isSignIn: false}

    isSignToggle=()=>{
        this.setState(prevState=>({isSignIn:!prevState.isSignIn}))
    }

    render(){
        const {isSignIn}=this.state
        return(
            <EmployeContext.Provider
            value={{isSignIn,isSignToggle:this.isSignToggle}}
            >
                <>
                    <BrowserRouter>
                    <Switch>

                    <Route path="/login" component={LoginRoute}/>
                    <Route exact path="/register" component={RegisterRoute} /> 
                    <ProtectedRoute exact path="/" component={Home}/>
                    <ProtectedRoute exact path="/employees-list" component={EmployeList}/>
                    <Redirect to="/login"/>
                    </Switch>

                    </BrowserRouter>

                </>
            </EmployeContext.Provider>
            
        )
    }
}


export default App;

