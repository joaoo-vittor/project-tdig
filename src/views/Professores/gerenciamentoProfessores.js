import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Endereco } from "../Endereco";
import { BASE_PATH } from "../../variables/url";

const GerenciamentoProfessor = (props) => {
  const { useState, useEffect } = React;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [columns, setAlunos] = useState([
    { title: "Id", field: "id", editable: "never" },
    { title: "matricula", field: "matricula", type: "numerico" },
    { title: "nome", field: "nome" },
    {
      title: "Id do endereco",
      field: "endereco_id",
      type: "numerico",
      render: (rowData) => (
        <Endereco
          data={rowData}
          loading={loading}
          setLoading={setLoading}
          user="professor"
        />
      ),
      editable: "never",
    },
    { title: "curso", field: "curso" },
  ]);

  function handleClick() {
    axios
      .get(`${BASE_PATH}/professor/read`)
      .then((response) => {
        console.log(response.data);
        const alunos = response.data.map((c) => {
          return {
            id: c.id,
            matricula: c.matricula,
            nome: c.nome,
            endereco_id: c.endereco_id,
            curso: c.curso,
          };
        });
        setData(alunos);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post(`${BASE_PATH}/professor/create`, {
        matricula: newData.matricula,
        nome: newData.nome,
        curso: newData.curso,
      })
      .then(function (response) {
        handleClick();
        console.log("salvo com sucesso");
      });
  }

  function handleUpdate(newData) {
    axios
      .put(`${BASE_PATH}/professor/update/${newData.id}`, {
        matricula: newData.matricula,
        nome: newData.nome,
        curso: newData.curso,
      })
      .then(function (response) {
        handleClick();
        console.log("atualizado com sucesso");
      });
  }

  function handleDelete(data) {
    axios
      .delete(`${BASE_PATH}/professor/delete/${data.id}`)
      .then(function (response) {
        handleClick();
        console.log("deletado com sucesso");
      });
  }

  useEffect(() => {
    handleClick();
  }, []);

  if (loading) {
    ((loading) => {
      handleClick();
      setLoading(!loading);
    })(loading);
  }

  return [
    <MaterialTable
      title="Gerenciamento de Professores"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleCreate(newData);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleUpdate(newData);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleDelete(oldData);

              resolve();
            }, 1000);
          }),
      }}
    />,
  ];
};

export default GerenciamentoProfessor;
