import React from 'react'

import { useContext } from 'react'								
import {Navigate} from 'react-router-dom'							
import { CRMContext } from '../componentes/context/CRMContext'					

export const PublicRoute = ({children}) => {							

  const { auth } = useContext(CRMContext);

  // Lee la última ruta almacenada en localStorage
  const lastPath = localStorage.getItem('lastPath') || '/clientes';

  // Si el usuario está autenticado, redirige a la última ruta o a "/clientes"
  return auth.auth ? <Navigate to={lastPath} /> : children;					
}