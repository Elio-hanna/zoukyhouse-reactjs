import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import useFetchProducts from "../Hooks/useFetchProducts";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
// toast message
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//edit
import useFetchCategories from "../Hooks/usefetchCategories";
import Edit from "./Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(id, name, category, price) {
  return { id, name, category, price };
}

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useFetchProducts();
  const [categories] = useFetchCategories();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editedData, setEditedData] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (menuItems) {
        setLoading(false);
      }
    }, 2000);
  }, [menuItems]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = menuItems?.map((item) =>
    createData(
      item.idproduct,
      item.productName,
      item.category,
      item.productPrice
    )
  );

  if (loading) {
    return <LoadingScreen />;
  }
  //delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      toast.success("Product deleted successfully!");

      // Remove the deleted product from the menuItems state
      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.idproduct !== id)
      );
    } catch (error) {
      toast.error("Error while deleting the product!");
      console.log(error);
    }
  };

  //edit

  const handleOpenEditDialog = (id) => {
    const itemToEdit = menuItems.find((item) => item.idproduct === id);
    setEditedData(itemToEdit);
    setOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      // Send a request to the backend to update the data
      await axios.put(`/products/${editedData.idproduct}`, editedData);
      toast.success("Product updated successfully!");
      // Update the menuItems state with the updated product
      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.idproduct === editedData.idproduct ? editedData : item
        )
      );
      handleClose();
    } catch (error) {
      toast.error("Error while updating the product!");
      console.log(error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.category}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    ${parseFloat(row.price).toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button onClick={() => handleOpenEditDialog(row.id)}>
                      Edit
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button onClick={() => handleDelete(row.id)}>Delete</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Edit
        open={open}
        handleClose={handleClose}
        handleSaveChanges={handleSaveChanges}
        handleEditInputChange={handleEditInputChange}
        editedData={editedData}
        categories={categories}
      />
    </>
  );
};

export default Admin;
