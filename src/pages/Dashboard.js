import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { userStore } from "../stores/UserStore";
import { statisticsStore } from "../stores/Statistics";
import { tsuccess } from "../components/messages/Message";
import { AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart } from "recharts";
// import { taskStore } from "../stores/TaskStore";
import { useTranslation } from "react-i18next";
function Dashboard() {
  const { t } = useTranslation();
  const token = userStore((state) => state.token);
  const statistics = statisticsStore((state) => state);
  const [expirationTime, setExpirationTime] = useState(0);
  useEffect(() => {
    getUserStats();
    getTaskStats();
    getRegistrationUserStats();
    getTaskComulative();
    getCategoryCount();
  }, []);

  useEffect(() => {
    async function fetchExpirationTime() {
      const time = await getExpirationTime();
      setExpirationTime(time);
    }

    fetchExpirationTime();
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
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  const handleSelectChange = (event) => {
    setExpirationTime(event.target.value);
  };

  const handlePutNewTokenTime = () => {
    putExpirationTime(expirationTime);
  };
  function putExpirationTime() {
    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/admin/token-expiration", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        defaultTokenExpirationMinutes: expirationTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        tsuccess(t("Token expiration time updated"));
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function getExpirationTime() {
    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/admin/token-expiration", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExpirationTime(data.expirationTime);
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
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  //cinza
  const renderCardUsers = (data, title, footer) => {
    return (
      <div className="col-lg-6 col-md-6 my-3">
        <div className="card">
          <div className="card-header text-center bg-secondary text-white">{title}</div>
          <div className="card-body display-6 text-center">{data}</div>
          {footer && <div className="card-footer text-center">{footer}</div>}
        </div>
      </div>
    );
  };
  //blue
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

  const dropdown = (data, title, footer) => {
    return (
      <div className="col-lg-4 col-md-4 col-sm-4 my-3">
        <div className="card">
          <div className="card-header text-center bg-primary text-white">{title}</div>
          <div className="card-body text-center">
            <select value={expirationTime} onChange={handleSelectChange}>
              <option value="">{t("Select token expiration time")}</option>
              <option value="5">{5 + t("minutes")}</option>
              <option value="10">{10 + t("minutes")}</option>
              <option value="15">{15 + t("minutes")}</option>
              <option value="20">{20 + t("minutes")}</option>
              <option value="30">{30 + t("minutes")}</option>
              <option value="60">{60 + t("minutes")}</option>
            </select>
          </div>
          <div className="card-footer text-center">
            <button type="button" className="btn btn-light" onClick={handlePutNewTokenTime}>
              {t("Save")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="col-lg-12">
          <h1 className="text-center">{t("Dashboard")}</h1>
        </div>

        <main className="row">
          <div className="col-lg-8 col-md-8 col-sm-8 my-3">
            <div className="card">
              <div className="card-header text-center text-secondary">{t("Total users")}</div>
              <div className="card-body display-6 text-center">{statistics.countUsers}</div>
            </div>
          </div>
          {dropdown(1, t("Token expiration time: "), t("Minutes"))}

          {renderCardUsers(statistics.confirmedUsers, t("Confirmed users"), `${t("Total users: ")}${statistics.countUsers}`)}
          {renderCardUsers(statistics.unconfirmedUsers, t("Uncorfirmed users"), `${t("Total users: ")}${statistics.countUsers}`)}

          {renderCardAvgTime(statistics.avgTasksPerUser, t("Task average per user"), t("Tasks"))}
          {renderCardAvgTime(statistics.avgTimeToBeDone, t("Time average to task be done"), t("Hours"))}

          {renderCardTasks(statistics.todoPerUser, t("TODO tasks"))}
          {renderCardTasks(statistics.doingPerUser, t("DOING tasks"))}
          {renderCardTasks(statistics.donePerUser, t("DONE tasks"))}

          {renderCardLineChart(statistics.chartUserPerTime, t("Registed users over time"))}
          {renderCardLineChart(statistics.chartTaskComulative, t("Total tasks Done over time"))}

          <div className="col-lg-6 my-3">
            <div className="card">
              <div className="card-header text-center bg-warning text-white">{t("Categories")}</div>
              <div className="card-body">{renderBarChart(statistics.categoryListOrdered)}</div>
            </div>
          </div>
        </main>
        <footer></footer>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
