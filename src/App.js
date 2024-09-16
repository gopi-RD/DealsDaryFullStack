import {Component} from "react"
import {BrowserRouter,Route,Switch} from "react-router-dom"

import EmployeContext from "./context/EmployeContext";
import RegisterRoute from "./components/RegisterRoute";
import LoginRoute from "./components/LoginRoute";
import Home from "./components/Home";
import EmployeList from "./components/EmployeList";

import "./App.css"

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
                     
                    <Route exact path="/register" component={RegisterRoute} /> 
                    <Route exact path="/login" component={LoginRoute}/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/employees-list" component={EmployeList}/>
                    

                    </Switch>

                    </BrowserRouter>

                </>
            </EmployeContext.Provider>
            
        )
    }
}


export default App;

