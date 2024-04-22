import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { userStore } from "../stores/UserStore";
import { statisticsStore } from "../stores/Statistics";
import { taskStore } from "../stores/TaskStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
  const statistics = statisticsStore((state) => state);
  // const users = userStore((state) => state.users);
  // const tasks = taskStore((state) => state.tasks);

  useEffect(() => {
    getUserStats();
    getTaskStats();
    getRegistrationUserStats();
    getTaskComulative();
  }, []);

  useEffect(() => {
    getTaskComulative();
  }, [statistics.chartTaskChange]);

  useEffect(() => {
    getRegistrationUserStats();
  }, [statistics.chartUserChange]);

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

        console.log("all", unconfirmed);

        // console.log(data);
      })
      .catch((error) => {
        console.log("Error:", error);
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
        // console.log(data);
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
        console.log("Error:", error);
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
        // console.log("users chart", data);
      })
      .catch((error) => {
        console.log("Error:", error);
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
        // console.log("tasks chart", data);
        setChartTaskComulative(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  const renderTaskStatusChart = (data) => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
      <PieChart width={400} height={400}>
        <Pie data={data} cx={200} cy={200} labelLine={false} outerRadius={80} fill="#8884d8" dataKey="count">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  };

  const renderChartLine = (data) => {
    const chartTaskComulative = data;
    const dataTaskComulative = Array.isArray(chartTaskComulative)
      ? chartTaskComulative.map((item) => ({
          ...item,
          date: `${item.year}-${item.month < 10 ? "0" + item.month : item.month}`,
        }))
      : [];
    return (
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
    );
  };

  // const chartUserPerTime = statistics.chartUserPerTime;
  // const data = Array.isArray(chartUserPerTime)
  //   ? chartUserPerTime.map((item) => ({
  //       ...item,
  //       date: `${item.month}-${item.year < 10 ? "0" + item.year : item.year}`,
  //     }))
  //   : [];

  return (
    <>
      <Header />
      <div>Contagem do número total de utilizadores: {statistics.countUsers}</div>
      <div>Contagem do número de utilizadores confirmados: {statistics.confirmedUsers}</div>
      <div>Contagem do número de utilizadores não confirmados: {statistics.unconfirmedUsers} </div>
      {/* {renderTaskStatusChart()} */}
      <br />
      <div>Contagem do número médio de tarefas por utilizador: {statistics.avgTasksPerUser}</div>
      <br />
      <div>Contagem do número de tarefas por estado: {statistics.todoPerUser} </div>
      <div>Contagem do número de tarefas por estado: {statistics.doingPerUser} </div>
      <div>Contagem do número de tarefas por estado: {statistics.donePerUser} </div>
      <br />
      <div>Tempo médio que uma tarefa demora até ser concluída: {statistics.avgTimeToBeDone}</div>
      <br />

      <div>Gráfico que mostre o número de utilizadores registados ao longo do tempo, agrupados por mês e ano:</div>
      {renderChartLine(statistics.chartUserPerTime)}
      <div>Gráfico cumulativo que mostre o número total de tarefas concluídas ao longo do tempo</div>

      {renderChartLine(statistics.chartTaskComulative)}
      <Footer />
    </>
  );
}

export default Dashboard;
