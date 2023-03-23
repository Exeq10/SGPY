import React from 'react'
import { Button } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';

function Pedido({id,estado,nombrepedido,orden,solicitante,fecha,confirmDelete}) {



  return (
    <tr key={id}>
    <th scope="row">{id} </th>
    <td className='text-capitalize'>{nombrepedido} </td>
    <td className={`text-capitalize ${estado}`}>{estado} </td>
    <td className='text-capitalize'>{orden} </td>
    <td className='text-capitalize'>{solicitante} </td>
    <td  className='text-capitalize'>{fecha} </td>

    <td>
<Button   className='m-2' variant='danger' onClick={()=>{confirmDelete(id) }} ><i className="fa-solid fa-trash"></i></Button>
<Link to={`/edit/${id}`} className='m-2 btn btn-warning'  ><i className="fa-solid fa-pen-to-square"></i></Link>
<Link to={`/show/${id}`} className='m-2 btn btn-info'  ><i className="fa-solid fa-eye"></i></Link>
<Button  className='m-2' variant='success 'onClick={()=> showAlert()} ><i className="fa-solid fa-check"></i></Button>

</td>
  </tr>

  )
}

export default Pedido