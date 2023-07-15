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

//add
import Add from "./Add";

const Header = styled("div")`
  height: 13vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #444;
`;

const Container = styled("div")`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
`;

const Info = styled("h5")`
  color: white;
  font-family: Arial, sans-serif;
  margin-bottom: 0;
`;
const Link = styled("a")`
  color: white;
  cursor: pointer;
`;
const Phone = styled("h5")`
  color: white;
  font-family: Arial, sans-serif;
  margin-top: 0;
`;
const Title = styled("h1")`
  color: white;
  margin-top: 0;
`;

const AddButton = styled("button")`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3e8e41;
  }
`
const EditButton = styled("button")`
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1976d2;
  }
`;

const DeleteButton = styled("button")`
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
`;

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
  const [showAdd, setShowAdd] = useState(false);

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

  //add
  const handleAddClick = () => {
    setShowAdd(true);
  };
  const handleAddClose = () => {
    setShowAdd(false);
  };

  return (
    <>
      <Header>
        <Container>
          <Info>
            Menu Created By{" "}
            <Link
              href="https://www.linkedin.com/in/elio-hanna/"
              target="_blank"
            >
              Elio HANNA
            </Link>
          </Info>
          <Phone>Tel: 71266943</Phone>
        </Container>
        <Container>
          <Title>ZoukyHouse Menu</Title>
        </Container>
      </Header>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                <AddButton onClick={handleAddClick}>Add</AddButton>
              </StyledTableCell>
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
                    <EditButton onClick={() => handleOpenEditDialog(row.id)}>
                      Edit
                    </EditButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <DeleteButton onClick={() => handleDelete(row.id)}>Delete</DeleteButton>
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
      {showAdd && <Add open={showAdd} handleClose={handleAddClose} />}
    </>
  );
};

export default Admin;
