import HomePage from "./pages/home";
import CategoriaPage from "./pages/categoria";
import Contacto from "./pages/contacto";
import Instalacion from "./pages/instalacion";
import Nosotros from "./pages/nosotros";
import NotFound from "./pages/NotFound";
import ProductoPage from "./pages/producto";
import ProductosPage from "./pages/productos";
import Sucursales from "./pages/sucursales";
import VehiculoPage from "./pages/vehiculo";
import VehiculosPage from "./pages/vehiculos";

export const routers = [
  {
    path: "/",
    name: "home",
    element: <HomePage />,
  },
  {
    path: "/productos",
    name: "productos",
    element: <ProductosPage />,
  },
  {
    path: "/productos/:categoria",
    name: "categoria",
    element: <CategoriaPage />,
  },
  {
    path: "/productos/:categoria/:producto",
    name: "producto",
    element: <ProductoPage />,
  },
  {
    path: "/vehiculos",
    name: "vehiculos",
    element: <VehiculosPage />,
  },
  {
    path: "/vehiculos/:vehiculo",
    name: "vehiculo",
    element: <VehiculoPage />,
  },
  {
    path: "/instalacion",
    name: "instalacion",
    element: <Instalacion />,
  },
  {
    path: "/nosotros",
    name: "nosotros",
    element: <Nosotros />,
  },
  {
    path: "/sucursales",
    name: "sucursales",
    element: <Sucursales />,
  },
  {
    path: "/contacto",
    name: "contacto",
    element: <Contacto />,
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
