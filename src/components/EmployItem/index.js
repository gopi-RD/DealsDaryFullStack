
import "./index.css"
const EmployeItem=(props)=>{
    const {employeDetails,onUpdateEmployeDetails,onDeleteEmploye}=props 
    const {name,email,designation,mobile,course,gender,id,createdAt,imageUrl}=employeDetails 
    const onClickEdit=()=>{
        onUpdateEmployeDetails(id)

    }

    const onDeleteButton=()=>{
       onDeleteEmploye(id)
    }

    return (
        <li className="item">
            <span className="id">{id}</span>
            <img src={imageUrl} alt={`${name} image`} className="image-item"/>
            <span className="name-item">{name}</span> 
            <span className="email-item">{email}</span>
            <span className="mobile-item">{mobile}</span>
            <span className="designation-item">{designation}</span>
            <span className="gender-item">{gender}</span>
            <span className="course-item">{course}</span>
            <span className="createAt-item">{createdAt}</span> 
            <p className="edit-delete-container">
                <button className="edit" onClick={onClickEdit} >Edit</button>
                <button  className="delete" onClick={onDeleteButton}>Delete</button>
            </p>
            </li>
            )
            }

export default EmployeItem;