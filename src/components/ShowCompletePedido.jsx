import {useState,useEffect} from 'react'
import html2canvas from "html2canvas";

import { useParams,useNavigate, Link } from 'react-router-dom';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/Firebase";
import { async } from "@firebase/util";
import { Button } from 'react-bootstrap';

function ShowCompletePedido() {
  /* uso estados para cada valor que voy a tomar del form  */
  const [nombrepedido, setNombrepedido] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [orden, setOrden] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [obs,setObs]= useState('')


  const { id } = useParams();
  const navegacion = useNavigate();

  const getPedidoById = async (id) => {
    const pedido = await getDoc(doc(db, "products", id));

    if (pedido.exists()) {
     

      setNombrepedido(pedido.data().nombrepedido)
      setSolicitante(pedido.data().solicitante)
      setOrden(pedido.data().orden)
      setFecha(pedido.data().fecha)
      setEstado(pedido.data().estado)
      setProveedor(pedido.data().proveedor)
      setObs(pedido.data().obs)


    } else {
      console.log("El producto no existe ");
    }
  };

  useEffect(() => {
    getPedidoById(id);
  }, []);




  function exportar() {
    html2canvas(document.querySelector("#ordenpng")).then((canvas) => {
      var image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      var a = document.createElement("a");
      a.href = image;
      a.download = `Pedido${orden}.png`;
      a.click();
    });
  }



  return (
    <div className='container '  > 

      <div className="card" id='ordenpng'>
        <div className="card-header ">
         <div className="card" style={{width: '15rem'}}>
           <img className="card-img-center" src="/logo.svg" alt="profile" />
          
          
         </div>
         
        </div>
        <div className="card-body">

          <h2 className='text-center text-capitalize'  >{nombrepedido} </h2>
          <blockquote className="blockquote mb-0 row">

            <h3 className='col mt-3 text-center '>N° Orden <span className='text-danger' >{orden}</span> </h3>

            <h4 className='col mt-3 text-center'> {fecha} </h4>
            <h4 className='col mt-3 text-center'>Solicitado por <span className='text-danger  text-capitalize' >{solicitante}</span>  </h4>


             
      
            <footer className="blockquote-footer">
              
              <h4>Observaciones:</h4>
              <h5 className='text-dark text-center'> {obs} </h5>

      
            </footer>
          </blockquote>
        </div>
      </div>
             
             <div className='w-100 mt-5  d-flex justify-content-between'>
           <Link to={'/'} className=' btn btn-warning' > <i className="fa-sharp fa-solid fa-arrow-left"></i>  </Link>
             <Button  variant='danger' onClick={exportar}  > Exportar</Button>
             </div>

        
    </div>
  )
}

export default ShowCompletePedido