import React, { useContext } from 'react'
import { Link } from 'react-router-dom';    //Se usa para generar un mejor perfomarnce al navegar entre paginas Link To

//Context
import { CRMContext } from '../context/CRMContext'

export const Navegacion = () => {
    
    //Uso del CONTEXT
    const {auth,guardarAuth} = useContext(CRMContext);

    //De acuerdo a la autenticacion, podemos definir que se va a mostrar en el Return
    if(!auth.auth){
        return null;
    }else{
        return ( 
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to={ "/clientes" } className="clientes"> Clientes </Link>
                <Link to={ "/productos" } className="productos"> Productos </Link>
                <Link to={ "/pedidos" } className="pedidos"> Pedidos </Link>
            </nav>
        </aside>
     );
    }
    
    
}