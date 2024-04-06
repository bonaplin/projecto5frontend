import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import DisplayProfile from "../components/display/DisplayProfile";
// import { Doughnut } from "react-chartjs-2";
import Header from "../components/header/Header";
import { userStore } from "../stores/UserStore";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function Profile() {
  const { selectedUser } = useParams();
  const token = userStore.getState().token; // Get the token from the Zustand store
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    photoURL: "",
    role: "",
    taskcount: "",
    todocount: "",
    doingcount: "",
    donecount: "",
  });

  useEffect(() => {
    fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/profile/${selectedUser}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setInputs(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [selectedUser, token]); // Dependências

  const datatasks = [
    { name: "To Do", value: inputs.todocount },
    { name: "Doing", value: inputs.doingcount },
    { name: "Done", value: inputs.donecount },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const renderLabel = ({ name, value }) => `${name}: ${value}`;
  return (
    <>
      <Header />
      <Layout>
        <div className="edit-profile-outer-container">
          <div className="edit-profile-page-wrap">
            <div className="header-profile">
              <h1>{inputs.username}</h1>
              <h3>
                ({inputs.firstname} {inputs.lastname})
              </h3>
              <img
                src={inputs.photoURL}
                alt="Profile"
                className="edit-profile-img"
              />
            </div>

            <DisplayProfile name="email" value={inputs.email} />
            <DisplayProfile name="tasks" value={inputs.taskcount} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={300} height={300}>
                  <Pie
                    data={datatasks}
                    labelLine={false}
                    label={renderLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {datatasks.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="button-group">
              <button className="yes-no no" type="button" value="Cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Profile;
