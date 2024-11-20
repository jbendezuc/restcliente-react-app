import React, {useState } from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

export const NuevoCliente = () => {

    const navigate = useNavigate(); //NECESARIO instanciar el useNavigate para poder ser llamado y redireccionar a otra ruta

    //usamos UseState para guardar la informacion del CLIENTE de los INPUTS que escribe
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //leer los datos del formulario y actualizar al instante segudno cambios del Onchage, usando el USESTATE
    const actualizarState = (e) =>{
        guardarCliente({
            ...cliente,
            [e.target.name]:e.target.value} //guardamos el targe.name nombre del input, y a la vez el valor de esa forma para q se guarde como objeto{}
        )
           console.log() 

    }

    //Validar Formulario que no este Vacio

    const validarCliente = () => {

        //Destructurin al cliente para validar que no esten Vacios
        const {nombre,apellido,empresa,email,telefono} = cliente;

        const valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }

    const agregarCliente = (e) => {
        e.preventDefault();


        //Enviar peticion al API (routa,el objeto con informacion porqe recibe la informacion en json)
        //Forma de Agregar datos como PROMESA
        clienteAxios.post('/clientes',cliente)
            .then(res => {
                
                //validar si hay errores de Mongo
                if(res.data.code === 11000){
                    //console.log('Error de duplicado email')
                    Swal.fire({
                        title: "Hubo un Error",
                        text: "Ese Cliente ya esta registrado",
                        icon: "error"
});
                }else{
                    //console.log(res.data);
                    Swal.fire({
                        title: "Se agregó el Cliente",
                        text: res.data.mensaje,
                        icon: "success"
});
                }
                //Redireccionar luego de la Operacion
                navigate('/clientes');          //usamos la instancia de useNavigate, NO OLVIDES ARRIBA INSTANCIARLO
            });
        
        
    }

    return (
        <>
            <h2>Nuevo Cliente</h2>

            <form onSubmit={agregarCliente}>    {/*onSubmit metodo para agregar en REACT funciones que envien informacion*/}

                <legend> Llena todo los campos </legend>
                <div className='campo'>
                    <label >Nombre: </label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} />
                </div>

                <div className='campo'>
                    <label >Apellido: </label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState}/>
                </div>

                <div className='campo'>
                    <label >Empresa: </label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState}/>
                </div>

                <div className='campo'>
                    <label >Email: </label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState}/>
                </div>

                <div className='campo'>
                    <label >Teléfono: </label>
                    <input type="text" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState}/>
                </div>

                <div className='campo'>
                    <input type="submit" className="btn btn-azul" value="Agregar Cliente" disabled={validarCliente()}/>
                </div>

            </form>
        </>
      );
}

