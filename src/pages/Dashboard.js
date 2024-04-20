import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { userStore } from "../stores/UserStore";
import { statisticsStore } from "../stores/Statistics";

function Dashboard() {
  const { setCountUsers, setConfirmedUsers, setUnconfirmedUsers, setAvgTasksPerUser, setTodoPerUser, setDoingPerUser, setDonePerUser } = statisticsStore();
  const token = userStore((state) => state.token);

  useEffect(() => {
    getUserStats();
    getTaskStats();
  }, []);
  function getUserStats() {
    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/statistic/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const all = data.countUsers;
        setCountUsers(all);
        const confirmed = data.confirmedUsers;
        setConfirmedUsers(confirmed);
        const unconfirmed = data.unconfirmedUsers;
        setUnconfirmedUsers(unconfirmed);

        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function getTaskStats() {
    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/statistic/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const avgTasks = data.avgTaskPerUser;
        const tasksPerTodo = data.todoPerUser;
        const tasksPerDoing = data.doingPerUser;
        const tasksPerDone = data.donePerUser;

        setAvgTasksPerUser(avgTasks);
        setTodoPerUser(tasksPerTodo);
        setDoingPerUser(tasksPerDoing);
        setDonePerUser(tasksPerDone);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <Header />
      <div>Contagem do número total de utilizadores: {statisticsStore.getState().countUsers}</div>
      <div>Contagem do número de utilizadores confirmados: {statisticsStore.getState().confirmedUsers}</div>
      <div>Contagem do número de utilizadores não confirmados: {statisticsStore.getState().unconfirmedUsers} </div>
      <br />
      <div>Contagem do número médio de tarefas por utilizador: {statisticsStore.getState().avgTasksPerUser}</div>
      <br />
      <div>Contagem do número de tarefas por estado: {statisticsStore.getState().todoPerUser} </div>
      <div>Contagem do número de tarefas por estado: {statisticsStore.getState().doingPerUser} </div>
      <div>Contagem do número de tarefas por estado: {statisticsStore.getState().donePerUser} </div>
      <br />
      <div>Tempo médio que uma tarefa demora até ser concluída .</div>
      <div>Gráfico que mostre o número de utilizadores registados ao longo do tempo (e.g. gráfico de linhas).</div>
      <div>Gráfico cumulativo que mostre o número total de tarefas concluídas ao longo do tempo.</div>

      <Footer />
    </>
  );
}

export default Dashboard;
