import P from "prop-types";
import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { BASE_PATH } from "../../variables/url";
import axios from "axios";

import "./style.css";

const auxKeys = ["cep", "rua", "numero", "cidade", "estado", "pais"];

export const Endereco = ({ data, loading, setLoading, user }) => {
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

  const updateAlunoOrProfessor = (id) => {
    if (user === "aluno") {
      axios
        .put(`${BASE_PATH}/alunos/update/${data.id}`, {
          endereco_id: id,
        })
        .then((response) => {
          console.log(response.data);
          setLoading(!loading);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .put(`${BASE_PATH}/professor/update/${data.id}`, {
          endereco_id: id,
        })
        .then((response) => {
          console.log(response.data);
          setLoading(!loading);
        })
        .catch((error) => console.log(error));
    }
  };

  const handlerCreateEndereco = () => {
    axios
      .post(`${BASE_PATH}/endereco/create`, { ...endereco })
      .then((response) => {
        console.log(response.data);
        updateAlunoOrProfessor(response.data.id);
      })
      .catch((error) => console.log(error));
  };

  const handlerUpdateEndereco = () => {
    axios
      .put(`${BASE_PATH}/endereco/update/${data.id}`, { ...endereco })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handlerDeleteEndereco = () => {
    axios
      .delete(`${BASE_PATH}/endereco/delete/${data.endereco_id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const execCreateORUpdate = () => {
    if (create) {
      handlerCreateEndereco();
    } else {
      handlerUpdateEndereco();
    }

    setModal(!modal);
  };

  const deleteEndereco = () => {
    handlerDeleteEndereco();
    updateAlunoOrProfessor(null);
    setModal(!modal);
  };

  return (
    <>
      {modal ? (
        <Modal open={modal} className="area-modal">
          <Box className="box-modal">
            <div className="header-modal">
              <h4>
                Endere??o do/da <strong>{data.nome}</strong>
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
                className="btn btn-endereco-deletar"
                onClick={() => deleteEndereco()}
              >
                Deletar
              </button>
              <button
                className="btn btn-endereco-salvar"
                onClick={() => execCreateORUpdate()}
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
  setLoading: P.func.isRequired,
  loading: P.bool.isRequired,
  user: P.string.isRequired,
};
