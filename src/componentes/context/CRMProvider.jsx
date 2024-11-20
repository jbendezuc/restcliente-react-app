import { useState } from "react";           //Utilizaremos useState para el USEContext
import { CRMContext } from "./CRMContext"; //Importamso el USECONTEXT CREADO

export const CRMProvider = ({children})=>{
//props.children = {children}    
    const [auth, guardarAuth] = useState({
        token: '',
        auth: false
    });

    return(
        <CRMContext.Provider value={{auth,guardarAuth}}>
            {children}
        </CRMContext.Provider>
    )

}
