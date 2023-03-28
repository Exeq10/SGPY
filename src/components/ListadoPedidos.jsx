import { db } from "../firebaseConfig/Firebase";

import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Pedido from "./Pedido";

import { Link } from "react-router-dom";
import Filtro from "./Filtro";

function ListadoPedidos({ pedidos, setpedidos,pedidosFiltrados , setpedidosFiltrados }) {
  /* 1)  creo los hooks */


  const[filtroEstado,setFiltroEstado] = useState('Todos')

  /*  2) referenciar la base de datos y coleccion  */

  const productsCollections = collection(db, "products");

  /* 3) mostrar los docs  */

  const getPedidos = async () => {
    const data = await getDocs(productsCollections);

    setpedidos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  /* 5) confirmar eliminacion   */

  const confirmDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Estas seguro?",
        text: "No habrá vuelta atrás!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Eliminado!",
            "Su pedido ha sido eliminado.",
            "success"
          );

          deletePedido(id);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Su pedido sigue en la lista  :)",
            "error"
          );
        }
      });
  };

  
  /* 4) Eliminar un doc  */
  const deletePedido = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);

    getPedidos();
  };

  /* alerta para eliminar  */
  const showAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Tarea cumplida ",
      showConfirmButton: true,
      timer: 2000,
    });
  };

  

  /* 6) useEffect para usar la funcion  */

  useEffect(() => {
    getPedidos();
  }, [pedidos]);



/* funcion para filtrar */

const filtrar = () =>{

 

  setpedidosFiltrados(pedidos.filter((pFiltrado) => pFiltrado.estado == filtroEstado)) 
  
 


  

}

/* controlamos los cambios del filtro y renderizamos lo mismo que el filtro  */
useEffect(() => {

  filtrar()
 
}, [filtroEstado])



  return (
    <div className="container text-center  ">


      <h1 className="mb-5 mt-4 "> Listado de Pedidos</h1>

     <Filtro setFiltroEstado={setFiltroEstado} />
          
      <div className="table-responsive ">
        <table className="table  table-hover  ">
          <thead>
            <tr>
              <th scope="col">ID Pedido</th>
              <th scope="col">Pedido</th>
              <th scope="col">Estado</th>
              <th scope="col">O/C</th>
              <th scope="col">Solicitante</th>
              <th scope="col">Fecha Solcitud</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

            { 
            pedidos == '' ? (<p  >No hay pedidos en este momento</p>)  :   <tbody>
            {
              filtroEstado == 'Todos' ? pedidos.map((pedido, key) => (
                <Pedido
                  key={key}
                  showAlert={showAlert}
                  confirmDelete={confirmDelete}
                  id={pedido.id}
                  estado={pedido.estado}
                  nombrepedido={pedido.nombrepedido}
                  orden={pedido.orden}
                  solicitante={pedido.solicitante}
                  proveedor={pedido.proveedor}
                  fecha={pedido.fecha}
                />
              )) : pedidosFiltrados.map((pedido, key) => (
                <Pedido
                  key={key}
                  showAlert={showAlert}
                  confirmDelete={confirmDelete}
                  id={pedido.id}
                  estado={pedido.estado}
                  nombrepedido={pedido.nombrepedido}
                  orden={pedido.orden}
                  solicitante={pedido.solicitante}
                  proveedor={pedido.proveedor}
                  fecha={pedido.fecha}
                />
              ))
            }
          </tbody> }

       
        </table>
      </div>

      <Link to={"/create"} className="btn btn-success m-5 p-1 w-25 fs-5  "  title="Crear Nuevo Pedido">
        <i className="fa-sharp fa-solid fa-plus"></i>
      </Link>
      <Link to={"/addProv"} className="btn btn-info m-5 p-1 w-25 fs-5  "  title="Añadir Proveedor">
      <i className="fa-solid fa-people-group"></i>
      </Link>
    </div>
  );
}

export default ListadoPedidos;
