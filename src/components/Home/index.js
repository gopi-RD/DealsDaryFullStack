
import { Component} from "react"
import Cookies from "js-cookie"
import Header from "../Header" 


import "./index.css"

class Home extends Component { 
    state={ isPopup:false,name:"",email:"",mobile:"",designation:"HR",gender:"Male",isMca:true,isBca:false,isBsc:false,image:"",
        isNameEr:false,isEmailEr:false,isMobileEr:false,course:"MCA",isImageEr:false,isError:false,isErrorText:"",isSuccess:false,isSuccessText:""}


    onCancelAddEmploye=()=>{
        this.setState({isPopup:false})
    }

    onChangeName=(event)=>{
        this.setState({name:event.target.value})
    }

    onChangeEmail=(event)=>{
        this.setState({email:event.target.value})
    }

    onChangeMobile=(event)=>{
        this.setState({mobile:event.target.value})
    }

    onChangeDesignation=(event)=>{
        this.setState({designation:event.target.value})
    }

    onMaleGender=(event)=>{
        this.setState({gender:event.target.value})
    }
    
    onFemaleGender=(event)=>{
        this.setState({gender:event.target.value})
    }

    onChangeMCACourse=()=>{
        this.setState({isMca:true,isBca:false,isBsc:false,course:"MCA"})
    }
    onChangeBCACourse=(event)=>{
        this.setState({isMca:false,isBca:true,isBsc:false,course:"BCA"})
    }
    onChangeBSCCourse=(event)=>{
        this.setState({isMca:false,isBca:false,isBsc:true,course:"BSC"})
    }

    onUploadimage=(event)=>{
        const file=event.target.files[0]
        if (file.type.startsWith("image/")){
            const reader=new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend=()=>{
                this.setState({image:reader.result})
            }
        }
    }

    onSuccessResponse=(data)=>{

        this.setState({isSuccess:true,isSuccessText:data.message})
    }

    onFailureResponse=(data)=>{
        this.setState({isError:true,isErrorText:data.error_msg})

    }

    onAddEmployeDetails=async(event)=>{
        event.preventDefault()
        const {name,email,mobile,designation,gender,course,image} = this.state 

        if (name===""){
            this.setState({isNameEr:true})
            return;
        }
        if (email===""){
            this.setState({isNameEr:false,isEmailEr:true})
            return;
        }
        if (mobile===""){
            this.setState({isNameEr:false,isEmailEr:false,isMobileEr:true})
        }if (mobile.length<10){
            this.setState({isNameEr:false,isEmailEr:false,isMobileEr:true,isImageEr:false})
            return;
        }
        if (image===""){
            this.setState({isNameEr:false,isEmailEr:false,isMobileEr:false,isImageEr:true})
            return;
        }else{
            this.setState({isNameEr:false,isEmailEr:false,isMobileEr:false,isImageEr:false})
        }

        const employeData={
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image_url:image,
        }
        const jwtToken=Cookies.get("jwt_token")
        const url=`${process.env.REACT_APP_URL}/employe-details/employe`
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${jwtToken}`
            },
            body:JSON.stringify(employeData) 

        }

        const response=await fetch(url,options);
        const data= await response.json();
        console.log(data);

        if (response.ok){
            this.onSuccessResponse(data)
        }else{
            this.onFailureResponse(data)
        }

        
        
        this.setState(prevState=>({
           name:"",email:"",mobile:"",image:""
        }))
    }


    onAddEmploye=()=>{
        const {name,email,mobile,designation,isBca,isBsc,isMca,isEmailEr,isMobileEr,isNameEr,isImageEr,isError,isErrorText,isSuccess,isSuccessText} = this.state
        const nameInputBorder= isNameEr ? "error-input-border":null 
        const emailInputBorder= isEmailEr? "error-input-border":null
        const mobileInputBorder= isMobileEr? "error-input-border":null 

        return (
            <div className="popup-container">
                <form className="employe-form-container" onSubmit={this.onAddEmployeDetails}>
                   
                   <div className="employe-separator">
                       <label className="label-e">NAME</label>
                       <input className={`input-text-e ${nameInputBorder}`} type="text" value={name} placeholder="Enter name" onChange={this.onChangeName}/> 
                       {isNameEr && <p className="error-text">*Required</p>}
                   </div>
                   <div className="employe-separator">
                       <label className="label-e">Email</label>
                       <input className= {`input-text-e ${emailInputBorder}`} type="email" value={email} placeholder="Enter email" onChange={this.onChangeEmail} />
                       {isEmailEr && <p className="error-text">*Required</p>}
                   </div>
                   <div className="employe-separator">
                       <label className="label-e">MOBILE NO</label>
                       <input className= {`input-text-e ${mobileInputBorder}`} type="number" value={mobile} placeholder="Enter mobile no" onChange={this.onChangeMobile} />
                       {isMobileEr && <p className="error-text">*Required</p>}
                   </div>
                   <div className="employe-separator">
                       <label className="label-e" >DESIGNATION</label>
                       <select className="input-text-e" value={designation} onChange={this.onChangeDesignation}>
                           <option value="HR" selected>
                               HR
                           </option>
                           <option value="Manager">
                               Manager
                           </option>
                           <option value="Sale">Sale</option>
                       </select>
                   </div>
                   <div className="employe-separator">
                       <label className="label-e">
                           GENDER
                       </label>
                       <div className="gender-container">
                       <div className="gender-card">
                          <input type="radio" id="male" name="course" value="Male" onChange={this.onMaleGender} checked />   
                           <label htmlFor="male">Male</label>
                       </div>
                       <div>
                           <input type="radio" id="female" name="course" value="Female" onChange={this.onFemaleGender}  />
                           <label htmlFor="female">Female</label>
                       </div>
                       </div>
                       
                       
                   </div>

                   <div className="employe-separator">
                       <label className="label-e">
                           COURSE
                       </label>
                       <div>
                           <input type="checkbox" id="MCAcourse"  checked={isMca}  onChange={this.onChangeMCACourse} />
                           <label htmlFor="MCAcourse">MCA</label>
                       </div>
                       <div>
                           <input type="checkbox" id="BCAcourse" checked={isBca}   onChange={this.onChangeBCACourse}  />
                           <label htmlFor="BCAcourse">BCA</label>
                       </div>
                       <div>
                           <input type="checkbox" id="BSCcourse" checked={isBsc}  onChange={this.onChangeBSCCourse} />
                           <label htmlFor="BSCcourse">BSC</label>
                       </div>
                   </div>

                   <div className="employe-separator">
                       <label className="label-e">IMAGE</label> 
                       <input type="file" name="image" accept="image/*" onChange={this.onUploadimage}/> 
                       {isImageEr && <p className="error-text">*Required</p>}
                   </div> 
                   <div className="buttons-container">
                       <button type="submit" className="submit-button-e" >
                           Submit
                       </button>
                       <button className="cancel-button" type="button" onClick={this.onCancelAddEmploye}>
                        Cancel
                       </button>
                   </div>
                   <div  className="buttons-container">
                   {isError && <p className="error-text">{isErrorText}</p>}
                   {isSuccess && <p className="success-text">{isSuccessText}</p>}
                   </div>
                  

                   



               </form>

            </div>
        )
    }

    onPopupContainer=()=>{
        this.setState({isPopup:true})
    }

    render (){
        const {isPopup}=this.state; 
        return(
            <>
            <Header/>
            <div className="bg-home-container">
                <h1 className="admin-panel-heading">Welcome Admin Panel</h1>
                <button className="add-employe-button" type="button" onClick={this.onPopupContainer} >Add Employes</button>
                {isPopup && this.onAddEmploye()}
            </div>
            </>
            
        )
    }
}

export default Home



