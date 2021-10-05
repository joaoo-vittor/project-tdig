import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { BASE_PATH } from "../../variables/url";
import { SelectBox } from "../SelectBox";

const GerenciamentoProjeto = (props) => {
  const { useState, useEffect } = React;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateIdAluno, setUpdateIdAluno] = useState(null);
  const [updateIdProfessor, setUpdateIdProfessor] = useState(null);

  const [columns, setAlunos] = useState([
    { title: "Id", field: "id", editable: "never" },
    { title: "area", field: "area" },
    // { title: "resumo", field: "resumo" },
    { title: "titulo", field: "titulo" },
    { title: "1° palavra", field: "palavra_chave_1" },
    { title: "2° palavra", field: "palavra_chave_2" },
    // { title: "3° palavra", field: "palavra_chave_3" },
    { title: "Url documento", field: "url_documento" },
    {
      title: "Id aluno",
      field: "aluno_id",
      editComponent: ({ rowData }) => (
        <SelectBox
          rowData={rowData}
          handlerSelectedIdAluno={setUpdateIdAluno}
          kind="aluno"
        />
      ),
    },
    {
      title: "Id professor",
      field: "professor_id",
      editComponent: ({ rowData }) => (
        <SelectBox
          rowData={rowData}
          handlerSelectedIdProfessor={setUpdateIdProfessor}
          kind="professor"
        />
      ),
    },
  ]);

  function handleClick() {
    axios
      .get(`${BASE_PATH}/projeto/read`)
      .then((response) => {
        const alunos = response.data.map((c) => {
          return {
            id: c.id,
            area: c.area,
            resumo: c.resumo,
            titulo: c.titulo,
            palavra_chave_1: c.palavra_chave_1,
            palavra_chave_2: c.palavra_chave_2,
            palavra_chave_3: c.palavra_chave_3,
            url_documento: c.url_documento,
            aluno_id: c.aluno_id,
            professor_id: c.professor_id,
          };
        });

        setData(alunos);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post(`${BASE_PATH}/projeto/create`, {
        area: newData.area,
        resumo: newData.resumo,
        titulo: newData.titulo,
        palavra_chave_1: newData.palavra_chave_1,
        palavra_chave_2: newData.palavra_chave_2,
        palavra_chave_3: newData.palavra_chave_3,
        url_documento: newData.url_documento,
        aluno_id: newData.aluno_id,
        professor_id: newData.professor_id,
      })
      .then(function (response) {
        setLoading(!loading);
        console.log("salvo com sucesso");
      });
  }

  function handleUpdate(newData) {
    axios
      .put(`${BASE_PATH}/projeto/update/${newData.id}`, {
        area: newData.area,
        resumo: newData.resumo,
        titulo: newData.titulo,
        palavra_chave_1: newData.palavra_chave_1,
        palavra_chave_2: newData.palavra_chave_2,
        palavra_chave_3: newData.palavra_chave_3,
        url_documento: newData.url_documento,
        aluno_id: newData.aluno_id,
        professor_id: newData.professor_id,
      })
      .then(function (response) {
        setLoading(!loading);
        console.log("atualizado com sucesso");
      });
  }

  function handleDelete(data) {
    axios
      .delete(`${BASE_PATH}/projeto/delete/${data.id}`)
      .then(function (response) {
        setLoading(!loading);
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
      title="Gerenciamento de Projetos"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleCreate({
                ...newData,
                aluno_id: updateIdAluno,
                professor_id: updateIdProfessor,
              });

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleUpdate({
                ...newData,
                aluno_id: updateIdAluno,
                professor_id: updateIdProfessor,
              });

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

export default GerenciamentoProjeto;
