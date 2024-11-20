import React, {useState, useEffect } from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {useNavigate,useParams} from 'react-router-dom';

export const EditarCliente = () => {

    const {id} = useParams();       //IMPORTAMOS EL USE PARAMS, para usar obtener el PARAMETRO DE LA URL

    const navigate = useNavigate(); //NECESARIO instanciar el useNavigate para poder ser llamado y redireccionar a otra ruta

    //usamos UseState para guardar la informacion del CLIENTE de los INPUTS que escribe
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    const solicitarAPICliente = async () => {
        /* 
        FORMA NORMAL DE OBTENER LOS DATOS como PROMISE
        clienteAxios.get(`/clientes/${id}`)
            .then(res => {
                console.log(res.data)
            }) */
        /* 
        FORMA NORMAL DE OBTENER LOS DATOS con ASYNC AWAIT
            }) */
        const clientesConsulta = await clienteAxios.get(`/clientes/${id}`);
        datosCliente(clientesConsulta.data);
        
    }
    
    useEffect(() => {
        solicitarAPICliente();
    }, []);

    //leer los datos del formulario y actualizar al instante segudno cambios del Onchage, usando el USESTATE
    const actualizarState = (e) =>{
        datosCliente({
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

    const actualizarCliente = (e) => {
        e.preventDefault();


        //Enviar peticion al API (routa,el objeto con informacion porqe recibe la informacion en json)
        clienteAxios.put(`/clientes/${cliente._id}`,cliente)
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
                        title: "Correcto",
                        text: 'Se actualizó Correctamente',
                        icon: "success"
});
                }
                //Redireccionar luego de la Operacion
                navigate('/clientes');          //usamos la instancia de useNavigate
            });
        
        
    }

    return (
        <>
            <h2>Editar Cliente</h2>

            <form onSubmit={actualizarCliente}>    {/*onSubmit metodo para agregar en REACT funciones que envien informacion*/}

                <legend> Llena todo los campos </legend>
                <div className='campo'>
                    <label >Nombre: </label>{/*actualizarState metodo para poder escribir o deje escribir encima del value, NECESARIO OBLIGATORIO */}
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} value={cliente.nombre} />
                </div>

                <div className='campo'>
                    <label >Apellido: </label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} value={cliente.apellido} />
                </div>

                <div className='campo'>
                    <label >Empresa: </label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} value={cliente.empresa} />
                </div>

                <div className='campo'>
                    <label >Email: </label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} value={cliente.email} />
                </div>

                <div className='campo'>
                    <label >Teléfono: </label>
                    <input type="text" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} value={cliente.telefono} />
                </div>

                <div className='campo'>
                    <input type="submit" className="btn btn-azul" value="Guardar Cambios" disabled={validarCliente()}/>
                </div>

            </form>
        </>
      );
}
