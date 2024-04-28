import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryModal from "../components/modal/CategoryModal";
import { userStore } from "../stores/UserStore";
import ModalYesNo from "../components/modal/ModalYesNo";
import { categoriesStore } from "../stores/CategoriesStore";
import { tsuccess, twarn, terror } from "../components/messages/Message";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

function Categories() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = userStore.getState().token;
  const username = userStore.getState().username;
  const { categories, setCategories } = categoriesStore((state) => state);

  const role = userStore.getState().role;
  // const [categorieData, setCategorieData] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  // console.log("Categories token", token);
  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories/", {
      headers: {
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      setCategories(data);
      categoriesStore.getState().setCategories(data);
      // tsuccess("Categories fetched successfully");
    } else {
      switch (response.status) {
        case 401:
          terror(data.message); // Unauthorized
          break;
        default:
          twarn("An error occurred: " + data.message);
          break;
      }
    }
  };

  /* ******* ******* *********************************** *****/
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = (category) => {
    setEditCategory(category);
    setIsDeleteModalOpen(true);
    // console.dir(category);
  };
  async function handleDeleteCategory() {
    const category = editCategory;
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories/${category.id}`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      fetchCategories();
      setIsDeleteModalOpen(false);
      tsuccess(data.message); // Category deleted
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // There are tasks with this category. Delete these tasks before deleting the category.
          break;
        case 401:
          terror(data.message); // Unauthorized
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }
  /* ******* ******* *********************************** *****/

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEdit = (category) => {
    setEditCategory(category);
    setIsEditModalOpen(true);
  };

  async function handleEditCategory(category) {
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();

    if (response.ok) {
      fetchCategories();
      setIsEditModalOpen(false);
      tsuccess(data.message); // Category updated
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Invalid category or Failed to update category
          break;
        case 401:
          terror(data.message); // Unauthorized
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }
  /* ******* ******* *********************************** *****/

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddCategoryButton = () => {
    setIsModalOpen(true);
  };

  async function handleCreateCategory(category) {
    console.log("Create Category", category);
    category.owner = username;
    const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();

    if (response.ok) {
      fetchCategories();
      setIsModalOpen(false);
      tsuccess(data.message); // Category added
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Invalid category
          break;
        case 401:
          terror(data.message); // Unauthorized
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []); // Add dependencies here if any

  /* ******* ******* *********************************** *****/

  let columns = ["id", "title", "description", "owner", "actions"];
  let columnMapping = {
    id: t("ID"),
    title: t("Title"),
    description: t("Description"),
    owner: t("Owner"),
    actions: t("Actions"),
  };

  const editCategoryy = t("Edit Category");
  const createCategory = t("Create Category");
  const deleteCategory = t("Delete Category");
  return (
    <>
      {/* <Header /> */}

      <div className="Home users">
        <div className="page-wrap">
          <h2>{t("All Category")}</h2>
          {role === "po" && (
            <>
              <Tooltip title={createCategory}>
                <AddCircleIcon className="add-some" onClick={handleAddCategoryButton} fontSize="large" />
              </Tooltip>

              <CategoryModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateCategory}
                title_modal={t("Create Category")}
                user={{}} // Pass an empty user object to the UserModal
              />
            </>
          )}
          {isEditModalOpen && (
            <CategoryModal
              open={isEditModalOpen}
              title_modal={editCategoryy}
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={handleEditCategory}
              category={editCategory}
            />
          )}
          {isDeleteModalOpen && (
            <>
              <ModalYesNo
                title={deleteCategory}
                message={t("Are you sure you want to delete this category?")}
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onYes={handleDeleteCategory}
                onNo={() => setIsDeleteModalOpen(false)}
              />
            </>
          )}

          <Table
            class="table"
            type="category"
            data={categories}
            columns={columns}
            columnMapping={columnMapping}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
export default Categories;

/* <Table
class="table"
data={userData}
columns={columns}
handleEdit={handleEdit}
handleDelete={handleDelete}
handleDeleteTasks={handleDeleteTasks}
handleActiveChange={handleActiveChange}
/> */
