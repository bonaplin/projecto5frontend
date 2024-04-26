import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";
import { useTranslation } from "react-i18next";
const CategoryModal = ({ open, onClose, onSubmit, title_modal, category = {} }) => {
  const [title, setTitle] = useState(category.title);
  const [description, setDescription] = useState(category.description);
  const [id, setId] = useState(category.id);
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      id,
    });
    // console.log("title " + title + "description " + description + "id" + id);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setId(0);
    onClose();
  };
  const editCategory = t("Edit Category");
  const createCategory = t("Create Category");

  return (
    <Modal open={open} onClose={onClose} title={title_modal}>
      {title_modal === createCategory ? (
        <form onSubmit={handleSubmit}>
          <FormInput placeholder={t("Enter category name")} type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <FormInput
            placeholder={t("Enter category description")}
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="button-container">
            <button type="submit" className="yes-no yes">
              Save
            </button>
            <button type="button" className="yes-no no" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      ) : title_modal === editCategory ? (
        <form onSubmit={handleSubmit}>
          <FormInput placeholder="Enter category name" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <FormInput
            placeholder={t("Enter category description")}
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="button-container">
            <button type="submit" className="yes-no yes">
              Save
            </button>
            <button type="button" className="yes-no no" onClick={onClose}>
              {t("Cancel")}
            </button>
          </div>
        </form>
      ) : (
        <h1>{t("oops")}</h1>
      )}
    </Modal>
  );
};

export default CategoryModal;
