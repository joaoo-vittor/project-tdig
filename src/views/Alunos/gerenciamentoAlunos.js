import { Button } from "@material-ui/core";
import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Endereco } from "../Endereco";

const BASE_PATH = "https://api-projeto-tdig.herokuapp.com";

const GerenciamentoAlunos = (props) => {
  const { useState } = React;

  const [modal, setModal] = useState(false);

  const [columns, setAlunos] = useState([
    { title: "Id", field: "id" },
    { title: "cpf", field: "cpf", initialEditValue: "cpf" },
    { title: "matricula", field: "matricula", type: "numerico" },
    { title: "nome", field: "nome" },
    {
      title: "endereco",
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
        // create an array of contacts only with relevant data
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
      .post("http://localhost:8080/TemplateWS/rest/ws/cadastraAluno", {
        id: newData.id,
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
      .post("http://localhost:8080/TemplateWS/rest/ws/atualizaAluno", {
        id: newData.id,
        cpf: newData.cpf,
        matricula: newData.matricula,
        nome: newData.nome,
        endereco_id: newData.endereco_id,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("atualizado com sucesso");
      });
  }

  return [
    <Button id="aew" color="primary" onClick={handleClick}>
      Consulta
    </Button>,
    <MaterialTable
      title="Gerenciamento de Alunos"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleCreate(newData);
              /*setData([...data, newData]);*/

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

              resolve();
            }, 1000);
          }),
      }}
    />,
  ];
};

export default GerenciamentoAlunos;
