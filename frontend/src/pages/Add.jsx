import React, { useState } from "react";
import { styled } from "styled-components";
import useFetchCategories from "../Hooks/usefetchCategories";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Section = styled.div`
  height: 100%;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  @media (max-width: 768px) {
    height: 15vh;
  }
`;

const FormSection = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  min-width: 500px;
  height: 100%;
`;

const Header = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  display: block;
  width: 95%;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  margin-bottom: 30px;
`;
const CategorySelect = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  margin-bottom: 30px;
`;
const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
`;

const SubmitBtn = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  &:hover {
    background-color: #3e8e41;
  }
`;

const Add = ({ open, handleClose }) => {
  const [categories] = useFetchCategories();
  const [cat, setCat] = useState("");
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");

  const validateForm = () => {
    const errors = {};

    if (!Name.trim()) {
      toast.error("Name is required");
      errors.name = "Name is required";
    }
    if (!cat.trim()) {
      toast.error("Category is required");
      errors.category = "Category is required";
    }

    if (!Price.trim()) {
      toast.error("Price is required");
      errors.price = "Price is required";
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ret = validateForm();
    if (ret == false) {
      return;
    } else {
      try {
        const res = await axios.post(`/products/`, {
          cat,
          Name,
          Price,
        });
        toast.success("Product added successfully!");
        handleClose();
      } catch (error) {
        toast.error("Error while adding the product!");
        console.log(error);
      }
    }
  };

  return (
    <Section>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <DialogContent>
          <FormSection>
            <Header>Add Product</Header>
            <Label>Category:</Label>
            <CategorySelect
              name="Category"
              onChange={(e) => setCat(e.target.value)}
              required
            >
              {categories &&
                categories.map((category) => (
                  <option
                    key={category.idCategory}
                    value={category.categoryName}
                  >
                    {category.categoryName}
                  </option>
                ))}
            </CategorySelect>
            <Label>Name:</Label>
            <Input
              type="text"
              name="Name"
              onChange={(e) => setName(e.target.value)}
              required
            ></Input>
            <Label>Price:</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              name="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            ></Input>
            <SubmitBtn onClick={handleSubmit}>Add Product</SubmitBtn>
          </FormSection>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Section>
  );
};

export default Add;
