import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

const StyledDialog = muiStyled(Dialog)`
  .MuiDialog-paper {
    margin: 20px;
    width: 100%;
    height: fit;
  }
`;

const StyledDialogTitle = muiStyled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textAlign: 'center',
}));

const StyledDialogContent = muiStyled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  paddingBottom: '10px',
  margin: '10px'
}));

const StyledDialogActions = muiStyled(DialogActions)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: '10px',
}));


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

const PopupForm = ({ open, handleClose, handleSaveChanges, handleEditInputChange, categories, editedData }) => {
  return (
    <StyledDialog open={open} onClose={handleClose}>
      <StyledDialogTitle>Edit Product</StyledDialogTitle>
      <StyledDialogContent>
        <Label htmlFor="productName">Product Name:</Label>
        <Input type="text" name="productName" value={editedData.productName} onChange={handleEditInputChange} />
        <Label htmlFor="category">Category:</Label>
        <CategorySelect name="category" value={editedData.category} onChange={handleEditInputChange}>
          {categories &&
            categories.map((category) => (
              <option key={category.idCategory} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
        </CategorySelect>
        <Label htmlFor="productPrice">Price:</Label>
        <Input
          type="number"
          step="0.01"
          min="0"
          name="productPrice"
          value={editedData.productPrice}
          onChange={handleEditInputChange}
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default PopupForm;
