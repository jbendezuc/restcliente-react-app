import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';

//Context
import { CRMContext } from '../context/CRMContext';


export function Login() {

    const navigate = useNavigate()

    //USESTATE para capturar los datos del formulario
    const [credenciales, guardarCredenciales] = useState({
        email:'',
        password: ''
    });

    const lastPath = localStorage.getItem('lastPath') || '/clientes';

    //USECONTEXT para almacenar las variables GLOBALES
    const {auth,guardarAuth} = useContext(CRMContext);
    
    //SI ACTUALIZAMOS LA PAGINA, CAPTURAMOS EL TOKEN DE LOCALSTORAGE
     useEffect( () => { 
        const token = localStorage.getItem('token'); 
        
        if(token){ 
            guardarAuth({ 
                token, 
                auth: true }); 
             navigate(lastPath)
        }else{
            navigate('/iniciar-sesion')
        }
    
    },[]);

    //FUNCION AL DARLE CLIC EN EL BOTON SUBMIT
    const iniciarSesion = async (e) =>{
        e.preventDefault();

        try {
            
            //Consulta a la API
            const respuesta = await clienteAxios.post('/iniciar-sesion',credenciales);

            //Extramos el Token de la respuesta de la API
            const { token } = respuesta.data;

            //Guardamos el token en el LOCALSTORAGE = recomendable guardarlo AQUI y no en COOKIES.
            localStorage.setItem('token',token);

            //Colocamos el token en el CONTEXT
            guardarAuth({
                token,
                auth: true
            })

            Swal.fire({
                icon:'success',
                title:'Login Correcto',
                text: 'Has iniciado Sesión'
            })

            //redireccionar
            navigate('/clientes')

        } catch (error) {
            
            if (error.response) {
                //SI EL ERROR TIENE UNA RESPUESTA ESPECIFICA es del server EXPRESS
                Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text: error.response.data.mensaje
            })
            }else{
                //ERROR DEL CORS, es un error GENERAL
                Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text: 'Intente denuevo'
            })
            }
        }


    }

    //FUNCION DE LOS FORMULARIOS - ONCHANGE
    const leerDatos = (e) =>{
        
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        });
    }

  return (

      <div className='login'>
            <h2>Iniciar Sesion</h2>

            <div className='contenedor-formulario'>
                <form onSubmit={iniciarSesion}>
                    <div className='campo'>
                        <label >Email</label>
                        <input type="text" name='email' placeholder='Email para Iniciar Sesion' onChange={leerDatos}/>
                    </div>

                    <div className='campo'>
                        <label >Password</label>
                        <input type="password" name='password' placeholder='Password para Iniciar Sesion' required onChange={leerDatos}/>
                    </div>

                    <input type="submit" value="Iniciar Sesion" className='btn btn-verde btn-block'/>
                </form>
            </div>

      </div>
  )
}
