import React, { useContext } from 'react'


//Context
import { CRMContext } from '../context/CRMContext'
import { useNavigate } from 'react-router-dom';

export const Header = () => { 
    
    //Uso del CONTEXT
    const {auth,guardarAuth} = useContext(CRMContext);

    //Uso del Navigate
    const navigate = useNavigate();
    
    const cerrarSesion = () => {
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.removeItem('token');

        //Redirrecionamos
        navigate('/iniciar-sesion');

    }
    
    return(
            <header className="barra">
                <div className="contenedor">
                    <div className='contenido-barra'>
                        <h1>CRM - Administrador de Clientes</h1>

                        { auth.auth ? (
                            <button type='button' className='btn btn-rojo' onClick={cerrarSesion}>
                                <i className='far fa-times-circle'></i>
                                Cerrar Sesión
                            </button>)
                            : null}
                             
                    </div>       
                </div>
            </header>
)}