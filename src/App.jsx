import {Routes, Route} from "react-router-dom";   //Permite la navegacion entre enlaces como rutas

//import './App.css'
/*** Layout ***/
import { Header } from "./componentes/layout/Header";
import { Navegacion } from "./componentes/layout/Navegacion";

/*** Componentes */
import { Clientes } from "./componentes/clientes/Clientes";
import { NuevoCliente } from "./componentes/clientes/NuevoCliente";
import { EditarCliente} from "./componentes/clientes/EditarCliente";

import { Productos } from "./componentes/productos/Productos";
import { NuevoProducto } from "./componentes/productos/NuevoProducto";
import { EditarProducto } from "./componentes/productos/EditarProducto";

import { Pedidos } from "./componentes/pedidos/Pedidos";
import { NuevoPedido } from "./componentes/pedidos/NuevoPedido";

import { Login } from "./componentes/auth/Login";

//Routes Publicas - Privadas
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";

//Provider Necesario para useContext
import { CRMProvider } from "./componentes/context/CRMProvider";

export const App = ()=>  {

  return (
    <>
    <CRMProvider>  {/*Permite envolver todo las rutas con el provider, para poder usar el USEContext*/}
      <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            
              <Routes>  {/* Envuenve las Routas, primero haber configurado el main con HasRoute, TODAS LAS RUTAS ESTAN AQUI, no importa donde lo llamen, si existe aqui, invoca el componente necesario */}
                    
                    {/** Si ejecutan la ruta cliente, se muestra el Componente en este espacio, dentro del main */}

                  <Route path="/*" element={
                    <PrivateRoute>
                      <Routes>
                        
                        <Route exact path="/clientes" element={ <Clientes />} /> 
                        <Route exact path="/clientes/nuevo" element={ <NuevoCliente /> } />
                        <Route exact path="/clientes/editar/:id" element={ <EditarCliente /> } />

                        <Route path="/productos" element={ <Productos />} />
                        <Route path="/productos/nuevo" element={ <NuevoProducto />} />
                        <Route path="/productos/editar/:id" element={ <EditarProducto />} />

                        <Route path="/pedidos" element={ <Pedidos />} />
                        <Route path="/pedidos/nuevo/:id" element={ <NuevoPedido />} />
                      </Routes>
                      
                    </PrivateRoute>
                  } />
                    
                  
                  <Route path="iniciar-sesion/*" element={
                    <PublicRoute>
                      <Routes>
                        <Route path="/*" element={<Login />} />
                      </Routes>
                      
                    </PublicRoute>
                  } />
              </Routes>

          </main>
        </div>
      </CRMProvider>
    </>  
  )
}

