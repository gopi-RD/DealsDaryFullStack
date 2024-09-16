

import {Component} from "react" 
import {Redirect} from "react-router-dom" 
import Cookies from "js-cookie"

import RegisterAndLoginHeader from "../RegisterAndLoginHeader"

import "./index.css"

class LoginRoute extends Component {
    state={username:"",password:"",showPassword:false,isUserErr:false,isPasswordErr:false,isUserErrMsg:"",isPasswordErrMsg:"",isErr:false,isErrorMsg:""}

    onChangeUsername=(event)=>{
        this.setState({username:event.target.value})
    }

    onChangePassword=(event)=>{
        this.setState({password:event.target.value})
    }

    onChangeCheckbox=()=>{
        this.setState(prevState=>({showPassword:!prevState.showPassword}))
    }

    onSuccessResponse=(jwtToken)=>{
        Cookies.set("jwt_token",jwtToken)
       const {history}=this.props 
        history.replace("/")
    }

    onFailureResponse=(msg)=>{

        this.setState({isErr:true,isErrorMsg:msg})


    }

    onSubmitForm=async (event)=>{
        event.preventDefault()
        const {username,password} =this.state

        // validate the username and 
        
        if (username===""){
            this.setState({isUserErr:true,isUserErrMsg:"Required"})
            return ;
        }
        if (password===""){
            this.setState({isUserErr:false,isPasswordErr:true,isPasswordErrMsg:"Required"})
            return;
        }else{
            this.setState({isUserErr:false,isPasswordErr:false}) 
        }

        localStorage.setItem("user",JSON.stringify(username))

        const userDetails={
            username,
            password
        }
        // send the Register API request
        const url=`https://dealsdaryassignment.onrender.com/user/login`
        console.log(url)
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userDetails)
        }

        const response=await fetch(url,options);
        const data=await response.json();
        console.log(data)
        if (response.ok){
            this.onSuccessResponse(data.jwt_token)
        }else{
            this.onFailureResponse(data.error_msg)
        }

    }

    render(){
                const {username, password,showPassword,isErr,isErrorMsg,isPasswordErr,isPasswordErrMsg,isUserErr,isUserErrMsg} = this.state 
                const userBorder=isUserErr?"error-input-border":null;
                const passwordBorder=isPasswordErr?"error-input-border":null; 
                const jwtToken=Cookies.get("jwt_token");
                if (jwtToken!==undefined){
                    return <Redirect to="/" />
                }
        return (
            <>
                <RegisterAndLoginHeader/>
                <div className="lg-home-page-container"  >

                    <form className="lg-register-form-container" onSubmit={this.onSubmitForm}>
                        <h1 className="lg-website-text">Login Deals Dary </h1> 
                        <div className="lg-separator">
                        <label className="lg-label-text" htmlFor="username">USERNAME</label>
                        <input className={`lg-input-element ${userBorder}`} type="text" id="username" value={username} onChange={this.onChangeUsername} placeholder="Enter the Username"/>
                        {isUserErr && <p className="error-text">{isUserErrMsg}</p>}
                        </div>
                        <div className="lg-separator">
                            <label  className="lg-label-text" htmlFor="password">PASSWORD</label>
                            <input className= {`lg-input-element ${passwordBorder}`} type={showPassword?"text":"password"} id="password" value={password} onChange={this.onChangePassword} placeholder="Enter the Password"/>
                            {isPasswordErr && <p className="error-text">{isPasswordErrMsg}</p>}
                        </div>
                        <div className="lg-separator">
                        <div className="lg-shown-password">
                            <input type="checkbox" id="shownPassword"  className="lg-checkbox" onChange={this.onChangeCheckbox} />
                            <label className="lg-label-text" htmlFor="shownPassword">Show Password</label>
                        </div>
                        <button className="lg-submit-button" type="submit">
                            Submit
                        </button>
                        {isErr && <p className="error-text">{isErrorMsg}</p>} 
                        </div>
                        
                        
                       
                    </form>
                </div>
               
            
            </>
        )
    }
}

export default LoginRoute