import React from 'react';
import { Link } from 'react-router-dom';    //Se usa para generar un mejor perfomarnce al navegar entre paginas Link To

export const Producto = ({_id,nombre,precio,imagen,eliminarProducto}) => {
    return ( 
        <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">$ {precio}</p>
                        {imagen ? (<img src={`${import.meta.env.VITE_APP_BACKEND_URL}/${imagen}`}  />) : null}
                    </div>
                    <div className="acciones">
                        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button type="button" className="btn btn-rojo btn-eliminar" onClick={()=> eliminarProducto(_id)}>
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
         </li>
     );
}