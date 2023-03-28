import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../firebaseConfig/Firebase";
import { Button } from "react-bootstrap";
import Selectprov from "./compProveedores/Selectprov";

function CreatePedido() {


  const[isOrden,setIsOrden] = useState(false)
  const navegacion = useNavigate();

  /* uso estados para cada valor que voy a tomar del form  */
  const [nombrepedido, setNombrepedido] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [orden, setOrden] = useState("");
  const [fecha, setFecha] = useState("");

  const [estado, setEstado] = useState("Pendiente");
  const [proveedor, setProveedor] = useState("");
  const [obs,setObs]= useState('')

  const [mensaje,setMensaje] = useState(false)

  /* indico a que coleccion voy a sumar el pedido  */

  const pedidosCollections = collection(db, "products");

  const store = async (e) => {

 

    console.log(obs);

    e.preventDefault();




    

    if([nombrepedido,solicitante,fecha,estado,proveedor,obs].includes('')) {

      
      setMensaje(true)

      setTimeout(() => {
        
        setMensaje(false)
      }, 1500);

      return
    } 

    await addDoc(pedidosCollections, {
      nombrepedido: nombrepedido,
      solicitante: solicitante,
      orden: orden,
      fecha: fecha,
      estado: estado,
      proveedor: proveedor,
      obs:obs
    });

    navegacion("/");
  };



  /* alerta  */
  const showError = ()=> {

    Swal.fire(
      'Error de Ingreso',
      'Debe completar todos los campos',
      'error'
    )
  }
  


  return (
    <div className="container w-50  mt-3 text-center">

<h1 className="mb-5 "  > Crear Nuevo Pedido </h1>


      <form onSubmit={store}>
{/* input de nombre del pedido  */}
        <div className="form-group">
          <label htmlFor="nombrepedido">Pedido</label>
          <input
            onChange={(e) => {
              setNombrepedido(e.target.value);
            }}
            type="text"
            className="form-control"
            id="nombrepedido"
            placeholder="Nombre de su pedido"
          />

{/* select solicitante */}
          <label htmlFor="solicitante">Solicitante</label>
          <input
            onChange={(e) => {
              setSolicitante(e.target.value);
            }}
            type="text"
            className="form-control"
            id="solicitante"
            placeholder="Quien solicita este pedido"
          />

{/* input orden de compra  */}  
        

 
  {isOrden ? ((<><label htmlFor="orden">Orden de compra </label><input
            onChange={(e) => {
              setOrden(e.target.value);
            } }
            type="number"
            className="form-control"
            id="solicitante"
            placeholder="Orden asociada" /></>))  : ''}


{/* input de fecha  */}
          <label htmlFor="fecha">Fecha de solicitud </label>
          <input
            onChange={(e) => {
              setFecha(e.target.value);
            }}
            type="date"
            className="form-control"
            id="fecha"
          />
{/* select de Proveedor  */}
          <label htmlFor="proveedor" className="m-2">
            Proveedor{" "}
          </label>
          <select
            onChange={(e) => {
              setProveedor(e.target.value);
            }}
            className="custom-select my-1 mr-sm-2 mt-5"
          >
            <option selected defaultValue={'Proveedor'}>
              Proveedor
            </option>

            <Selectprov/>
          </select>
{/* Select de estado */}
          <label htmlFor="estado" className="m-2">
            Estado{" "}
          </label>
          <select
            onChange={(e) => {
              setEstado(e.target.value);

              estado =='Pendiente'  ? setIsOrden(true) : ''
           
        
      }
            }
            className="custom-select my-1 mr-sm-2 mt-5"
          >
            <option  >
              Estado del Pedido
            </option>
          
            <option className="Procesado"  value={"Procesado"}>En Proceso</option>
            <option className="Tramitado"  value={"Tramitado"}>En Trámite</option>
            <option className="Entregado"  value={"Entregado"}>Entregado </option>
          </select>
        </div>

   {/* textarea para mensaje Opcional  */}

   <label htmlFor="observaciones" className="m-2">
            Observaciones{" "}
          </label>
   <textarea onChange={(e)=> {setObs(e.target.value)}} className="form-control" rows={3} defaultValue={""} id={'observaciones'} />     

{/* input de tipo submit  */}
        <input
      
          type="submit"
          value={"Confirmar Pedido"}
          className="btn btn-success mt-5"
        />
      </form>
      <Link to={'/'} className="btn btn-warning  mt-3" ><i className="fa-sharp fa-solid fa-arrow-left"></i></Link>


      {mensaje ? showError() : '' }
    </div>
  );
}

export default CreatePedido;
