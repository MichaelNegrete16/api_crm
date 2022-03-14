import { useNavigate } from "react-router-dom"

const Cliente = ({cliente,handleEliminar}) => {

const navigate = useNavigate()
    
const {nombre,empresa,email,telefono,notas,id}=cliente

  return (
    <tr className='border-b hover:bg-blue-100'>
        <td className='p-3'>{nombre}</td>
        <td className='p-3'> 
            <p><span className='text-gray-800 font-bold'>Email:</span> {email} </p>
            {telefono &&(
                <p><span className='text-gray-800 font-bold'>Telefono:</span> {telefono} </p>
            )}
        </td>
        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
            
            <button type="buttom" 
                    className='w-full text-white font-bold p-2 bg-orange-600 mt-3
                            hover:bg-orange-700 block uppercase rounded-md shadow-md text-xs'
                    onClick={()=>navigate(`/clientes/${id}`)}
            >Ver</button>

            <button type="buttom" 
                    className='w-full text-white font-bold p-2 bg-blue-600 mt-3
                            hover:bg-blue-700 block uppercase rounded-md shadow-md text-xs'
                    onClick={()=> navigate(`/clientes/editar/${id}`)}
            >Editar</button>
            <button type="buttom"
                    className='w-full text-white font-bold p-2 bg-red-600 mt-3
                            hover:bg-red-700 block uppercase rounded-md shadow-md text-xs'
                    onClick={()=> handleEliminar(id)}
            >Eliminar</button>
        </td>
    </tr>
  )
}

export default Cliente