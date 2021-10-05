import React, { useState, useEffect } from "react";
import P from "prop-types";
import axios from "axios";
import { BASE_PATH } from "../../variables/url";

import "./style.css";

export const SelectBox = ({
  rowData,
  handlerSelectedIdAluno,
  handlerSelectedIdProfessor,
  kind,
}) => {
  const [data, setData] = useState([]);
  const [idSelected, setIdSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleClick() {
    if (kind === "aluno") {
      axios
        .get(`${BASE_PATH}/alunos/read`)
        .then((response) => {
          const data = response.data.map((c) => {
            return {
              id: c.id,
              nome: c.nome,
            };
          });
          setData(data);
          setLoading(!loading);
        })
        .catch((error) => console.log(error));
    }

    if (kind === "professor") {
      axios
        .get(`${BASE_PATH}/professor/read`)
        .then((response) => {
          const data = response.data.map((c) => {
            return {
              id: c.id,
              nome: c.nome,
            };
          });
          setData(data);
          setLoading(!loading);
        })
        .catch((error) => console.log(error));
    }
  }

  useEffect(() => {
    handleClick();
    if (kind === "aluno") setIdSelected(rowData.aluno_id);
    if (kind === "professor") setIdSelected(rowData.professor_id);
  }, []);

  useEffect(() => {
    if (kind === "aluno") handlerSelectedIdAluno(idSelected);
    if (kind === "professor") handlerSelectedIdProfessor(idSelected);
  }, [idSelected]);

  const handlerChange = (e) => {
    setIdSelected(+e.target.value);
  };

  return (
    <>
      {loading ? (
        <select
          className="select-box"
          value={idSelected}
          onChange={handlerChange}
        >
          {data.map((obj) => {
            return (
              <option key={obj.id} value={obj.id}>
                {obj.id} - {obj.nome}
              </option>
            );
          })}
        </select>
      ) : (
        false
      )}
    </>
  );
};

SelectBox.propTypes = {
  rowData: P.object.isRequired,
  handlerSelectedIdAluno: P.func,
  handlerSelectedIdProfessor: P.func,
  kind: P.string,
};
