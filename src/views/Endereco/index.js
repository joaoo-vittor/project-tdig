import P from "prop-types";
import React, { useState } from "react";
import { Modal, Box, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import axios from "axios";

import "./style.css";

// const BASE_PATH = "https://api-projeto-tdig.herokuapp.com";
const BASE_PATH = "http://127.0.0.1:8000";
const auxKeys = ["cep", "rua", "numero", "cidade", "estado", "pais"];

export const Endereco = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [endereco, setEndereco] = useState({});
  const [create, setCreate] = useState(null);

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
    if (data.endereco_id) {
      handleEndereco(data.endereco_id);
      setCreate(false);
    } else {
      console.log(data.id);
      setCreate(true);
      setEndereco({
        cep: "",
        rua: "",
        numero: "",
        cidade: "",
        estado: "",
        pais: "",
      });
    }
  };

  const handlerChange = (event, key) => {
    setEndereco({ ...endereco, [key]: event.target.value });
    console.log(event.target.value);
  };

  const handlerCreateEndereco = () => {
    axios
      .get(`${BASE_PATH}/endereco/create/${id}`)
      .then((response) => {
        console.log(response.data);
        setEndereco(response.data);
      })
      .catch((error) => console.log(error));
  };
  const handlerUpdateEndereco = () => {};

  const execCreateORUpdate = () => {
    if (create) {
      handlerCreateEndereco();
    } else {
      handlerUpdateEndereco();
    }
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
            <div className="header-modal">
              <h4>
                Endereço do/da <strong>{data.nome}</strong>
              </h4>
              <Close onClick={() => setModal(!modal)} className="close-icon" />
            </div>
            <div>
              {auxKeys.map((key) => (
                <div className="inputs" key={key}>
                  <label htmlFor={`${key}`}>{key}</label>
                  <input
                    id={`${key}`}
                    type="text"
                    value={endereco[key]}
                    onChange={(e) => handlerChange(e, key)}
                  />
                </div>
              ))}
            </div>

            <div className="container-btn">
              <button
                className="btn-endereco"
                onClick={() => {
                  console.log(endereco);
                  return setModal(!modal);
                }}
              >
                Salvar
              </button>
            </div>
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
