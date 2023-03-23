import {useState,useEffect} from 'react'
import { db } from "../../firebaseConfig/Firebase";

import {
    collection,
    getDocs,
    getDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

function Selectprov() {

/* hooks */

const [proveedor,setProveedor] = useState([])


/*  2) referenciar la base de datos y coleccion  */

const provedorsCollections = collection(db, "proveedores");


/* 3) mostrar los docs  */

const getProveedores = async () => {
  const data = await getDocs(provedorsCollections);

  setProveedor(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};




useEffect(() => {
  getProveedores();
}, [proveedor]);



  return (
    <>
   {proveedor.map((prov)=> (

<option value={prov.nombre}>{prov.nombre} </option>
   ))}
           </>
  )
}

export default Selectprov