import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import { useAccount, useContractWrite } from "wagmi";
import contractInterface from "../contract-abi.json";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import contractInterfaces from "../token-abi.json";

export default function ApproveModal(props, amount) {
  console.log(props,"to see props are working or not")
  const [_referrer, setInputValue] = useState();
  const [isLoading, setIsLoading] = useState();
  const [open, setOpen] = useState(false);
  const [errMsg, setErrorMsg] = useState(false);

  console.log(contractInterface, "to get the contractInterface");
  console.log(props.amount, "props here");

  const address = useAccount();
  console.log(props?.props?._packageId, _referrer,"to send to SC")

  const { write } = useContractWrite({

    address: "0x49B8F3AaEfd3866308e05007f2e5a4ED9f0053dd",
    abi: contractInterface,
    functionName: "buyPackage",
    // chainId: 80001,
    overrides: {
      gasLimit: "800000",
    },
    args: [props?.props?._packageId, _referrer],

    onError(error) {
      console.log("Error", error);
    },

    async onSuccess(data) {
      setOpen(true);
      console.log("Success", data);
      let tx = await data.wait();
      console.log(tx.status, "to get the tx");

      if (tx?.status == 0) {
        // toast.error("Trasaction Failed.")
        setErrorMsg(true);
        setOpen(false);
        setTimeout(() => {
          setErrorMsg(false);
        }, [5000]);
        console.log(tx.status, "error is here");
      }
      if (tx?.status == 1) {
        setOpen(false);
        toast.success("Transaction Confirmed.");
        props.setmodalshow(false);
      }
    },
  });

  async function setDisapprove() {
    toast.error("Please Enter Refferal Address.");
  }


  const buy = useContractWrite({
    address: "0x4e898f14c7E0e3ccb2761182317686A110bCcf42",
    //   address: "0x4e898f14c7E0e3ccb2761182317686A110bCcf42",
    abi: contractInterfaces,
    functionName: "approve",
    // chainId: 80001,
    overrides: {
      gasLimit: "800000",
    },

    args: ["0x49B8F3AaEfd3866308e05007f2e5a4ED9f0053dd", props?.amount],

    onError(error) {
      console.log("Error", error);
    },

    async waitForTransaction() {
      setOpen(true);
      setIsLoading(true);
    },

    async onSuccess(data) {
      setOpen(true);
      console.log("Success", data);
      let tx = await data.wait();

      console.log(tx.status, "to get the tx");

      
      if (tx.status == "1") {
        write?.();
        setOpen(false);
        // setAmount?.setAmount(props?.props?.price);
        toast.success("Approve Successfully.");
      }

      if (tx.status == "0") {
        setOpen(false);
        // setAmount?.setAmount(props?.props?.price);
        toast.error("Failed Trasaction.");
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <Modal
        {...props}
        // size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="approve-modal"
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* onClick={()=>props.setModalShow(false)} */}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Approve</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="modalHeading">Refferal Address </h4>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            className="modalInput"
            placeholder="Enter Refferal Address "
            required
          />
          {errMsg && (
            <span
              style={{
                color: "red",
                float: "left",
                fontWeight: "600",
                width: "100%",
                fontSize: "18px ",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              Transaction Failed{" "}
            </span>
          )}
        </Modal.Body>
        <Modal.Footer>
          {_referrer ? (
            <Button className="modalSubmitBtn" onClick={() => buy?.write()}>
              {isLoading == true ? "Loading.." : "Approve"}
            </Button>
          ) : (
            <Button className="modalSubmitBtn" onClick={() => setDisapprove()}>
              {isLoading == true ? "Loading.." : "Approve"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<Index/>);
// wait for trasaction
