import { Button } from "@material-ui/core";
import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Endereco } from "../Endereco";

// const BASE_PATH = "https://api-projeto-tdig.herokuapp.com";
const BASE_PATH = "http://127.0.0.1:8000";

const GerenciamentoAlunos = (props) => {
  const { useState, useEffect } = React;

  const [columns, setAlunos] = useState([
    { title: "Id", field: "id" },
    { title: "cpf", field: "cpf", initialEditValue: "cpf" },
    { title: "matricula", field: "matricula", type: "numerico" },
    { title: "nome", field: "nome" },
    {
      title: "Id do endereco",
      field: "endereco_id",
      type: "numerico",
      render: (rowData) => <Endereco data={rowData} />,
    },
    { title: "curso", field: "curso" },
  ]);

  const [data, setData] = useState([]);

  function handleClick() {
    axios
      .get(`${BASE_PATH}/alunos/read`)
      .then((response) => {
        console.log(response.data);
        const alunos = response.data.map((c) => {
          return {
            id: c.id,
            cpf: c.cpf,
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
      .post(`${BASE_PATH}/alunos/create`, {
        cpf: newData.cpf,
        matricula: newData.matricula,
        nome: newData.nome,
        endereco_id: newData.endereco_id,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("salvo com sucesso");
      });
  }

  function handleUpdate(newData) {
    axios
      .put(`${BASE_PATH}/alunos/update/${newData.id}`, {
        cpf: newData.cpf,
        matricula: newData.matricula,
        nome: newData.nome,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("atualizado com sucesso");
      });
  }

  function handleDelete(data) {
    axios
      .delete(`${BASE_PATH}/alunos/delete/${data.id}`)
      .then(function (response) {
        console.log("deletado com sucesso");
      });
  }

  useEffect(() => {
    handleClick();
  }, []);

  return [
    <MaterialTable
      title="Gerenciamento de Alunos"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleCreate(newData);
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              handleUpdate(newData);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              handleDelete(oldData);

              resolve();
            }, 1000);
          }),
      }}
    />,
  ];
};

export default GerenciamentoAlunos;
