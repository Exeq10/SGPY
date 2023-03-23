import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate,Link } from "react-router-dom";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/Firebase";
import { async } from "@firebase/util";

function EditPedido() {
  /* uso estados para cada valor que voy a tomar del form  */
  const [nombrepedido, setNombrepedido] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [orden, setOrden] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");
  const [proveedor, setProveedor] = useState("");

  const navegacion = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();

    const pedido = doc(db, "products", id);
    const dato = {
      nombrepedido: nombrepedido,
      solicitante: solicitante,
      orden: orden,
      fecha: fecha,
      estado: estado,
      proveedor: proveedor,
    };

    await updateDoc(pedido, dato);
    navegacion("/");
  };

  const getPedidoById = async (id) => {
    const pedido = await getDoc(doc(db, "products", id));

    if (pedido.exists()) {
     

      setNombrepedido(pedido.data().nombrepedido)
      setSolicitante(pedido.data().solicitante)
      setOrden(pedido.data().orden)
      setFecha(pedido.data().fecha)
      setEstado(pedido.data().estado)
      setProveedor(pedido.data().proveedor)


    } else {
      console.log("El producto no existe ");
    }
  };

  useEffect(() => {
    getPedidoById(id);
  }, []);

  return (
  <div className="container w-50  mt-5 text-center">

  <h1 className="mb-5 "  >SGPY- Modificar Pedido </h1>
  
  
        <form onSubmit={update}>
  {/* input de nombre del pedido  */}
          <div className="form-group">
            <label htmlFor="nombrepedido">Pedido</label>
            <input
            value={nombrepedido}
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
            value={solicitante}
              onChange={(e) => {
                setSolicitante(e.target.value);
              }}
              type="text"
              className="form-control"
              id="solicitante"
              placeholder="Quien solicita este pedido"
            />
  
  {/* input orden de compra  */}  
            <label htmlFor="orden">Orden de compra </label>
            <input
            value={orden}
              onChange={(e) => {
                setOrden(e.target.value);
              }}
              type="number"
              className="form-control"
              id="solicitante"
              placeholder="Orden asociada"
            />
  
  {/* input de fecha  */}
            <label htmlFor="fecha">Fecha de solicitud </label>
            <input
            value={fecha}
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
            value={proveedor}
              onChange={(e) => {
                setProveedor(e.target.value);
              }}
              className="custom-select my-1 mr-sm-2 mt-5"
            >
            
              <option value={"Asatul"}>Asatul</option>
              <option value={"Tomacon"}>Tomacon</option>
              <option value={"Sudel"}>Sudel</option>
            </select>
  {/* Select de estado */}
            <label htmlFor="estado" className="m-2">
              Estado{" "}
            </label>
            <select
            value={estado}
              onChange={(e) => {
                setEstado(e.target.value);
              }}
              className="custom-select my-1 mr-sm-2 mt-5"
            >
             
             <option className="Procesado"  value={"Procesado"}>En Proceso</option>
            <option className="Tramitado"  value={"Tramitado"}>En Trámite</option>
            <option className="Entregado"  value={"Entregado"}>Entregado </option>
            </select>
          </div>
  
  {/* input de tipo submit  */}
          <input
            type="submit"
            value={"Modificar Pedido"}
            className="btn btn-warning mt-5"
          />
        </form>
        <Link to={'/'} className="btn btn-danger  mt-5" ><i className="fa-sharp fa-solid fa-arrow-left"></i></Link>
      </div>
)}

export default EditPedido;
