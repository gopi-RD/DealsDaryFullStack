import React from 'react';

const EmployeContext=React.createContext({
    isSignIn:false,
    isSignToggle:()=>{},
})

export default EmployeContext;