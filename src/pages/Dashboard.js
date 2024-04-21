import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { userStore } from "../stores/UserStore";
import { statisticsStore } from "../stores/Statistics";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Dashboard() {
  const {
    setCountUsers,
    setConfirmedUsers,
    setUnconfirmedUsers,
    setAvgTasksPerUser,
    setTodoPerUser,
    setDoingPerUser,
    setDonePerUser,
    setAvgTimeToBeDone,
    setChartUserPerTime,
    setChartTaskComulative,
  } = statisticsStore();
  const token = userStore((state) => state.token);

  useEffect(() => {
    getUserStats();
    getTaskStats();
    getRegistrationUserStats();
    getTaskComulative();
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
        const avgDone = data.avgTimeToBeDone;
        // const userPerTime = data.data;
        setAvgTasksPerUser(avgTasks);
        setTodoPerUser(tasksPerTodo);
        setDoingPerUser(tasksPerDoing);
        setDonePerUser(tasksPerDone);
        setAvgTimeToBeDone(avgDone);
        // setChartUserPerTime(userPerTime);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function getRegistrationUserStats() {
    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/statistic/userchart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChartUserPerTime(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function getTaskComulative() {
    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/statistic/taskschart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChartTaskComulative(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const chartUserPerTime = statisticsStore.getState().chartUserPerTime;
  const data = Array.isArray(chartUserPerTime)
    ? chartUserPerTime.map((item) => ({
        ...item,
        date: `${item.month}-${item.year < 10 ? "0" + item.year : item.year}`,
      }))
    : [];

  const chartTaskComulative = statisticsStore.getState().chartTaskComulative;
  const dataTaskComulative = Array.isArray(chartTaskComulative)
    ? chartTaskComulative.map((item) => ({
        ...item,
        date: `${item.month}-${item.year < 0 ? "0" + item.year : item.year}`,
      }))
    : [];

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
      <div>Tempo médio que uma tarefa demora até ser concluída: {statisticsStore.getState().avgTimeToBeDone}</div>
      <br />
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="count" /> {/* Corrigido para 'userCoung' */}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={dataTaskComulative}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="count" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>Gráfico cumulativo que mostre o número total de tarefas concluídas ao longo do tempo.</div>

      <Footer />
    </>
  );
}

export default Dashboard;
