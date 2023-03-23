import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { db } from "../../firebaseConfig/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { async } from "@firebase/util";
import { Button } from "react-bootstrap";

function AddProveedor() {
  const [mensaje, setMensaje] = useState(false);

  const navegacion = useNavigate();

  /* uso estados para cada valor que voy a tomar del form  */
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mediodepago, setmediodepago] = useState("");
  const [celular, setCelular] = useState("");

  /* indico a que coleccion voy a sumar el pedido  */

  const provedorsCollections = collection(db, "proveedores");

  const store = async (e) => {
    e.preventDefault();

    if ([nombre, mediodepago, contacto, celular].includes("")) {
      setMensaje(true);

      setTimeout(() => {
        setMensaje(false);
      }, 1500);

      return;
    }

    await addDoc(provedorsCollections, {
      nombre: nombre,
      contacto: contacto,
      mediodepago: mediodepago,
      celular: celular,
    });

    confirm()

    navegacion("/");
  };

  /* alerta  */
  const showError = () => {
    Swal.fire("Error de Ingreso", "Debe completar todos los campos", "error");
  };

  const confirm = ()=>{
    Swal.fire("Ingreso Correcto", "Se ha ingresado su proveedor", "success");

  }

  return (
    <div className="container w-50  mt-5 text-center">
      <h1 className="mb-5 ">SGPY-Añadir Proveedor</h1>

      <form onSubmit={store}>
        {/* input de nombre del proveedor  */}
        <div className="form-group">
          <label htmlFor="nombre">Pedido</label>
          <input
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Nombre Proveedor"
          />

          {/* select contacto */}
          <label htmlFor="contacto">Contacto</label>
          <input
            onChange={(e) => {
              setContacto(e.target.value);
            }}
            type="text"
            className="form-control"
            id="contacto"
            placeholder="Contacto / Vendedor /Referente "
          />

          {/* input orden de compra  */}

          <label htmlFor="celular">Celular/ Teléfono </label>
          <input
            onChange={(e) => {
              setCelular(e.target.value);
            }}
            type="number"
            className="form-control"
            id="celular"
            placeholder="Celular/Télefono"
          />

          {/* input de fecha  */}
          <label htmlFor="mediodepago">Medio de pago </label>
          <input
            onChange={(e) => {
              setmediodepago(e.target.value);
            }}
            type="text"
            className="form-control"
            id="mediodepago"
          />
        </div>

        {/* input de tipo submit  */}
        <input
          type="submit"
          value={"Ingresar Proveedor"}
          className="btn btn-success mt-5"
        />
      </form>
      <Link to={"/"} className="btn btn-warning  mt-3">
        <i className="fa-sharp fa-solid fa-arrow-left"></i>
      </Link>

      {mensaje ? showError() : ""}
    </div>
  );
}

export default AddProveedor;
