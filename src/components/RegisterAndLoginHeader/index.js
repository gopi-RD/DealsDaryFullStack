import { withRouter } from "react-router-dom"
import EmployeContext from "../../context/EmployeContext"
import "./index.css"

const RegisterAndLoginHeader=(props)=>(



    <EmployeContext.Consumer>
        {
            value=>{
                const {isSignIn,isSignToggle}=value  
                let route=null;
                if (isSignIn===true){
                    route= "/login"
                }else{
                    route= "/register"
                }

                const onChangeSignInOrSignUp=()=>{
                    isSignToggle()
                    
                    props.history.replace(route)

                }
                return(
                    <div className="re-header-top-container">
                    <header className="re-header-container" >
                        <h1 className="re-website-logo">DealsDray</h1> 
                        <button className="sign-in-and-sign-up-button" type="button" onClick={onChangeSignInOrSignUp} >
                            Sign-in / Sign-up
                        </button>
                    </header>
                    </div>
                )    

            }


        }
    </EmployeContext.Consumer>
    
    )

export default withRouter(RegisterAndLoginHeader)