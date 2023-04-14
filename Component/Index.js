import React,{useState, useEffect} from 'react'
import Navbar from './ui/Navbar'
import ApproveModal from "./ApproveModal";
import { ToastContainer, toast } from "react-toastify";
import { useAccount, useContractWrite } from 'wagmi';
import contractInterface from "../token-abi.json";
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from 'react-bootstrap';

const Index = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [packageItem, setPackageItem] = useState()
    const [open , setOpen] = useState(true)

    const [amount, setInputValue] = useState();
    const [isLoading, setIsLoading] = useState();
  
      console.log(contractInterface, "to get the contractInterface");
         
      

    const address = useAccount()
  
//     const { write} =useContractWrite({
  
      
//       address: "0x45d12b59b965880c9F8A38eFdBA3075631e70Caf",
//     //   address: "0x4e898f14c7E0e3ccb2761182317686A110bCcf42",
//       abi: contractInterface,
//       functionName: "approve",
//       // chainId: 80001,
//       overrides: {
//         gasLimit: "800000",
//       },
  
//       args: ["0x4e898f14c7E0e3ccb2761182317686A110bCcf42",
//                amount],
   
  
//           onError(error) {
//         console.log("Error", error);
//       },
  
//         async waitForTransaction(){
//   setOpen(true)
//   setIsLoading(true)
//         },
  
   
//       async onSuccess(data) {
//         setOpen(false)
//         console.log("Success", data);
//         toast.success("Approve Successfully.")
//         let tx = await data.wait();
//         setModalShow(true)
//         console.log(tx.status, "to get the tx");
//         if (tx.status == "1") {
//           setAmount?.setAmount(props?.props?.price);
//         }
//       },
//     });
  
  
    async function setDisapprove(){
      toast.error("Please Enter Refferal Address.")
    }
  




const data  =[{name:"Package", _packageId:1, price:100}, {name:"Package2",_packageId:2, price:200},
    {name:"Package3",_packageId:3, price:300},{name:"Package4",_packageId:4, price:400},
    {name:"Package5",_packageId:5, price:500},{name:"Package6",_packageId:6, price:600}
]
 
   async function handlerFn (e){
    
    console.log(e,"id is here")
    setPackageItem(e)

    if(e){
        const bgInt = (BigInt(e?.price * 1.6)).toString()
      
      setInputValue(bgInt)
       setModalShow(true)
    }
    // setModalShow(true)

    console.log(amount,"amount here")
   }
  return (
      <div className='body-head'>
        <Navbar/>
        <div className='container'>
            <div className='row'>

                <div className='form-body'>
                    <div className='form-section'>
                  <table className='table table-section'>

              <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Buy</th>
                </tr>
              </thead>


                <tbody>
                    {data?.map((item)=>{
                     return(


                 
                    <tr  className='table-tr'>
                        <td> {item.name}</td>
                        <td>  {item.price}</td>
                        <td className='td-div '>
                            <div className='td-maindiv'>
                            

                            {/* {_referrer  ?  */}
      <Button className="btn table-btn" onClick={()=> handlerFn?.(item)}  >
          {isLoading == true ? "Loading.." : "Approve"}
        </Button>
        {/* // :
        // <Button className="btn table-btn" onClick={()=>setDisapprove()}  >
        //   {isLoading == true ? "Loading.." : "Approve"}
        // </Button>
        //  } */}
                            
                            
                            {/* <button  className='btn table-btn' label="Buy" onClick={()=> handlerFn(item)} >Buy</button> */}
                            </div>
                        </td>
                    </tr>

                        )
                      }
                      )}

                </tbody>
                  </table>
                    </div>
                </div>
            </div>
        </div>



        <ApproveModal
        setmodalshow={setModalShow}
        show={modalShow}
        onHide={() => setModalShow(false)}
        props = {packageItem}
        amount ={amount}

      />
    </div>
  )
}

export default Index