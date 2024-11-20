import React from 'react'

export const FormCantidadProducto = ({_id,producto,cantidad,precio,nombre,aumentarProducto,restarProducto,index,eliminarProducto}) => {

    return (  
        <li>
            <div className='texto-producto'>
                <p className='nombre'> {nombre} </p>
                <p className='precio'> ${precio} </p>
            </div>
            <div className='acciones'>
                <div className='contenedor-cantidad'>
                    <i onClick={() => restarProducto(index)} className='fas fa-minus'></i>
                    {/**Cuando quieras pasar una funcion, y evitar que se ejecute sola, debes hacerlo asi
                     * onClick={aumentarProducto} ASI NO
                     * onClick={() => restarProducto()} ASI, SI
                     */}
                    <p>{cantidad}</p>
                    <i onClick={() => aumentarProducto(index)} className='fas fa-plus'></i>
                </div>
                <button type='button' className='btn btn-rojo' onClick={()=>eliminarProducto(_id)}>
                    <i className='fas fa-minus-circle'></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
}
 