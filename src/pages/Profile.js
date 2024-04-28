import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import DisplayProfile from "../components/display/DisplayProfile";
import { userStore } from "../stores/UserStore";
import { useTaskStore } from "../stores/useTaskStore";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ChatSidebar from "../components/chat/ChatSideBar";
import AsideOffCanvas from "../components/chat/AsideOffCanvas";
import { useTranslation } from "react-i18next";
function Profile() {
  const { t } = useTranslation();
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
    // taskcount: "",
    // todocount: "",
    // doingcount: "",
    // donecount: "",
  });

  const { allTasks } = useTaskStore((state) => state);

  const [showChat, setShowChat] = useState(false);

  const handleChatClicks = () => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  const [isChatOpen, setIsChatOpen] = useState(false); // Chat visibility state
  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat visibility
  };
  useEffect(() => {
    fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/profile/${selectedUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data);
        setInputs(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [selectedUser, token]);

  const [datatasks, setDatatasks] = useState([]); // State to store the data for the chart
  // Inside your component
  useEffect(() => {
    if (allTasks) {
      const todotask = allTasks.filter((task) => task.status === 100 && task.owner === selectedUser && task.active === true).length;
      const doingtask = allTasks.filter((task) => task.status === 200 && task.owner === selectedUser && task.active === true).length;
      const donetask = allTasks.filter((task) => task.status === 300 && task.owner === selectedUser && task.active === true).length;

      setDatatasks([
        {
          name: "To Do",
          value: todotask,
        },
        {
          name: "Doing",
          value: doingtask,
        },
        {
          name: "Done",
          value: donetask,
        },
      ]);
    }
    // Update the state or props that the chart is based on
  }, [allTasks]);

  const COLORS = ["#ec9191", "#5f9ea0", "#4c59af"];
  const renderLabel = ({ name, value }) => `${name}: ${value}`;

  function handleCloseSidebar() {
    setIsChatOpen(false);
  }

  return (
    <>
      {/* <Header /> */}
      <Layout>
        <div className="edit-profile-outer-container">
          <div className="edit-profile-page-wrap">
            <div className="header-profile">
              <div>
                <h1>{inputs.username}</h1>
                <h3>
                  ({inputs.firstname} {inputs.lastname})
                </h3>
              </div>
              <img src={inputs.photoURL} alt={t("Profile")} className="edit-profile-img" />
            </div>

            <DisplayProfile name={t("email")} value={inputs.email} />
            <button className="yes-no yes" type="button" value={t("Chat")} onClick={handleChatClicks}>
              {t("Chat")}
            </button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              {inputs.taskcount === 0 ? (
                <h1>{t("No tasks")}</h1>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={300} height={300}>
                    <Pie data={datatasks} labelLine={false} label={renderLabel} outerRadius={100} fill="" dataKey="value">
                      {datatasks.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="button-group">
              <button className="yes-no no" type="button" value={t("Cancel")} onClick={() => navigate("/users")}>
                {t("Cancel")}
              </button>
              <AsideOffCanvas show={showChat} handleClose={handleCloseChat} user={selectedUser} />
            </div>
          </div>
        </div>
      </Layout>
      {isChatOpen && <ChatSidebar onOpen={handleChatClick} onClose={handleCloseSidebar} />}
    </>
  );
}

export default Profile;
