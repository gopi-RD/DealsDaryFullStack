
import {Link,withRouter} from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"
const Header =(props)=>{

    const onLogoutButton =()=>{

        const {history} = props
        Cookies.remove("jwt_token")
        history.push("/login")
        
    }
    const data=  JSON.parse(localStorage.getItem("user"))
    const userName=data.slice(0,1).toUpperCase()+data.slice(1,data.length)

    return (
        <header className="header-top-container"> 
        <nav className="header-container">
            <h1 className="website-logo">DealsDray</h1>
          
                <ul className="nav-list-items">
                    <h1 className="user-name">{` Welcome ${userName}`}</h1>
                    <li className="nav-item">
                        <Link  className="nav-link" to="/">Home</Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/employees-list">
                          Employees List
                      </Link>
                    </li>

                    <button className="logout-button" onClick={onLogoutButton}>Logout</button>
                    
                </ul>
          

          
           
        </nav>
        </header>
       
    )
}


export default withRouter(Header)