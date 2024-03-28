import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  title_modal,
  category = {},
}) => {
  const [title, setTitle] = useState(category.title);
  const [description, setDescription] = useState(category.description);
  const [id, setId] = useState(category.id);

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

  return (
    <Modal open={open} onClose={onClose} title={title_modal}>
      {title_modal === "Create Category" ? (
        <form onSubmit={handleSubmit}>
          <FormInput
            placeholder="Enter category name"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormInput
            placeholder="Enter category description"
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
      ) : title_modal === "Edit Category" ? (
        <form onSubmit={handleSubmit}>
          <FormInput
            placeholder="Enter category name"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormInput
            placeholder="Enter category description"
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
      ) : (
        <h1>oops</h1>
      )}
    </Modal>
  );
};

export default CategoryModal;
