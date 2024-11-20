import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CRMContext } from '../componentes/context/CRMContext';

export const PrivateRoute = ({ children }) => {

    const { auth } = useContext(CRMContext); // Acceso al estado de autenticación
    const location = useLocation(); // Obtener la ubicación actual

    useEffect(() => {
        if (auth?.auth) {
            // Guardar la última ruta visitada en localStorage
            const currentPath = location.pathname + location.search;
            localStorage.setItem('lastPath', currentPath);
        }
    }, [auth, location]);

    // Si no está autenticado, redirige a iniciar sesión
    if (!auth.auth) {
        return <Navigate to="/iniciar-sesion" state={{ from: location }} />;
    }

    // Renderiza los hijos si está autenticado
    return children;
};