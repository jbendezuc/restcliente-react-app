import React from 'react'
import { Link } from 'react-router-dom';    //Se usa para generar un mejor perfomarnce al navegar entre paginas Link To

export const Cliente = ({_id,nombre,apellido,empresa,email,telefono,eliminarCliente}) => {

    return (  
        <li className='cliente'>
            <div className='info-cliente'>
                <p className='nombre'>{nombre}</p>
                <p className='empresa'>{empresa}</p>
                <p>{email}</p>
                <p>{telefono}</p>
            </div>
            <div className='acciones'>
                <Link to={`/clientes/editar/${_id}`} className='btn btn-azul'><i className='fas fa-pen-alt'></i>
                Editar Cliente
                </Link>
                <Link to={`/pedidos/nuevo/${_id}`} className='btn btn-amarillo'><i className='fas fa-plus'></i>
                Nuevo Pedido
                </Link>              
                <button type='button' className='btn btn-rojo btn-eliminar' onClick={() => eliminarCliente(_id)}> {/*no se puede eliminar(_id) porque se ejecuta automaticamente, la forma correcta de pasar id es ()=>eliminarCliente(_id) */}
                <i className='fas fa-times'></i>
                Eliminar Cliente
                </button>
            </div>
        </li>
    );
}
 

