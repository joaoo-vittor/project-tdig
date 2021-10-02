import P from "prop-types";
import React, { useState } from "react";
import { Modal, Box, Typography } from "@material-ui/core";
import axios from "axios";

import "./style.css";

// const BASE_PATH = "https://api-projeto-tdig.herokuapp.com";
const BASE_PATH = "http://127.0.0.1:8000";

export const Endereco = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [endereco, setEndereco] = useState({});
  // const [sendData, setSendData] = useState(false);

  function handleEndereco(id) {
    axios
      .get(`${BASE_PATH}/endereco/read_one/${id}`)
      .then((response) => {
        console.log(response.data);
        setEndereco(response.data);
      })
      .catch((error) => console.log(error));
  }

  const exec = () => {
    setModal(!modal);
    handleEndereco(data.endereco_id);
  };

  return (
    <>
      {modal ? (
        <Modal
          open={modal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="area-modal"
        >
          <Box className="box-modal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Endereço do {data.nome}
            </Typography>
            <div>
              {Object.keys(endereco).map((key, value) => (
                // <p>{`${key} - ${endereco[key]}`}</p>
                <div className="inputs">
                  <label htmlFor={`${key}`}>{key}</label>
                  <input id={`${key}`} type="text" value={endereco[key]} />
                </div>
              ))}
            </div>

            <button onClick={() => setModal(!modal)}>Salvar</button>
          </Box>
        </Modal>
      ) : (
        <div className="id-endereco" onClick={() => exec()}>
          <h6>{data.endereco_id ? data.endereco_id : "add"}</h6>
        </div>
      )}
    </>
  );
};

Endereco.propTypes = {
  data: P.object.isRequired,
};
