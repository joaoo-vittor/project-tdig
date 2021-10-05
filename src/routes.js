/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import { PersonAdd, Work } from "@material-ui/icons";
import GerenciamentoProjetos from "views/Projetos/gerenciamentoProjetos.js";
import GerenciamentoProfessores from "views/Professores/gerenciamentoProfessores.js";
import GerenciamentoAlunos from "views/Alunos/gerenciamentoAlunos.js";

const dashboardRoutes = [
  {
    path: "/professor",
    name: "Professor",
    rtlName: "Professor",
    icon: PersonAdd,
    component: GerenciamentoProfessores,
    layout: "/admin",
  },
  {
    path: "/alunos",
    name: "Alunos",
    rtlName: "Alunos",
    icon: Person,
    component: GerenciamentoAlunos,
    layout: "/admin",
  },
  {
    path: "/projetos",
    name: "Projetos",
    rtlName: "Projetos",
    icon: Work,
    component: GerenciamentoProjetos,
    layout: "/admin",
  },
];

export default dashboardRoutes;
