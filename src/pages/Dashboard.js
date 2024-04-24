import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { userStore } from "../stores/UserStore";
import { statisticsStore } from "../stores/Statistics";
import { AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart } from "recharts";
// import { taskStore } from "../stores/TaskStore";

function Dashboard() {
  // const {
  //   setCountUsers,
  //   setConfirmedUsers,
  //   setUnconfirmedUsers,
  //   setAvgTasksPerUser,
  //   setTodoPerUser,
  //   setDoingPerUser,
  //   setDonePerUser,
  //   setAvgTimeToBeDone,
  //   setChartUserPerTime,
  //   setChartTaskComulative,
  //   setCategoryListOrdered,
  // } = statisticsStore();

  const token = userStore((state) => state.token);
  const statistics = statisticsStore((state) => state);
  // const users = userStore((state) => state.users);
  // const tasks = taskStore((state) => state.tasks);

  useEffect(() => {
    getUserStats();
    getTaskStats();
    getRegistrationUserStats();
    getTaskComulative();
    getCategoryCount();
  }, []);

  // useEffect(() => {
  //   getTaskComulative();
  //   getCategoryCount();
  // }, [taskStore.getState().done, taskStore.getState().doing, taskStore.getState().todo]);

  // useEffect(() => {
  //   getRegistrationUserStats();
  // }, [statistics.chartUserChange]);

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
        statisticsStore.getState().setCountUsers(all);
        const confirmed = data.confirmedUsers;
        statisticsStore.getState().setConfirmedUsers(confirmed);
        const unconfirmed = data.unconfirmedUsers;
        statisticsStore.getState().setUnconfirmedUsers(unconfirmed);

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

        statisticsStore.getState().setAvgTasksPerUser(avgTasks);
        statisticsStore.getState().setTodoPerUser(tasksPerTodo);
        statisticsStore.getState().setDoingPerUser(tasksPerDoing);
        statisticsStore.getState().setDonePerUser(tasksPerDone);
        statisticsStore.getState().setAvgTimeToBeDone(avgDone);
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
        statisticsStore.getState().setChartUserPerTime(data);
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
        statisticsStore.getState().setChartTaskComulative(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function getCategoryCount() {
    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/statistic/orderCategories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        statisticsStore.getState().setCategoryListOrdered(data);
        statisticsStore((state) => state.setCategoryListOrdered(data));
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  const renderBarChart = (data) => {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          width={400}
          height={250}
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 0,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill="cadetblue" />
        </BarChart>
      </ResponsiveContainer>
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
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={dataTaskComulative}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="cadetblue" fill="cadetblue" />
            {/* <Area type="monotone" dataKey="anotherCount" stroke="#8884d8" fill="#8884d8" /> */}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderCardUsers = (data, title) => {
    return (
      <div className="col-lg-4 col-md-6 my-3">
        <div className="card">
          <div className="card-header text-center bg-secondary text-white">{title}</div>
          <div className="card-body display-6 text-center">{data}</div>
        </div>
      </div>
    );
  };
  const renderCardTasks = (data, title) => {
    return (
      <div className="col-lg-4 col-md-6 col-sm-12 my-3 ">
        <div className="card">
          <div className="card-header text-center bg-success text-white">{title}</div>
          <div className="card-body text-center display-6">{data}</div>
        </div>
      </div>
    );
  };
  const renderCardLineChart = (data, title) => {
    return (
      <div className="col-lg-6 my-3">
        <div className="card">
          <div className="card-header text-center bg-secondary text-white">{title}</div>
          <div className="card-body">{renderChartLine(data)}</div>
          <div className="card-footer text-center">Users registered over time</div>
        </div>
      </div>
    );
  };
  const renderCardAvgTime = (data, title, footer) => {
    return (
      <div className="col-lg-6 col-md-6 my-3">
        <div className="card">
          <div className="card-header text-center bg-primary text-white">{title}</div>
          <div className="card-body text-center display-6">{data}</div>
          {footer && <div className="card-footer text-center">{footer}</div>}
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="col-lg-12">
          <h1>Dashboard</h1>
        </div>

        <main className="row">
          <div className="col-lg-4 col-md-12 my-3">
            <div className="card">
              <div className="card-header text-center text-secondary">Total users</div>
              <div className="card-body display-6 text-center">{statistics.countUsers}</div>
            </div>
          </div>
          {renderCardUsers(statistics.confirmedUsers, "Confirmed users")}
          {renderCardUsers(statistics.unconfirmedUsers, "Uncorfirmed users")}

          {renderCardAvgTime(statistics.avgTasksPerUser, "Task average per user", "Tasks")}
          {renderCardAvgTime(statistics.avgTimeToBeDone, "Time average to task be done", "Hours")}

          {renderCardTasks(statistics.todoPerUser, "TODO tasks")}
          {renderCardTasks(statistics.doingPerUser, "DOING tasks")}
          {renderCardTasks(statistics.donePerUser, "DONE tasks")}

          {renderCardLineChart(statistics.chartUserPerTime, "Registed users over time")}
          {renderCardLineChart(statistics.chartTaskComulative, "Total tasks Done over time")}

          <div className="col-lg-6 my-3">
            <div className="card">
              <div className="card-header text-center bg-warning text-white">Categories</div>
              <div className="card-body">{renderBarChart(statistics.categoryListOrdered)}</div>
            </div>
          </div>
        </main>
        <footer>
          <h3>footer do dashboard</h3>
        </footer>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
