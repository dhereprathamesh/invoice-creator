import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InvoiceHome = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState();
  const [rowId, setRowId] = useState();

  console.log("dataaaaaaaaa", data);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/invoice/get-all-invoice"
        );
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching invoices", error);
      }
    };

    fetchInvoices();
  }, []);

  const handleDeleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/invoice/${id}`);
      setData(data.filter((invoice) => invoice._id !== id));
      console.log("Invoice deleted successfully");
    } catch (error) {
      console.error("Error deleting invoice", error);
    }
  };

  const rows = data?.data?.map((item, index) => ({
    id: item._id,
    invoiceNo: item.invoiceNo,
    orderNo: item.orderNo,
    billingName: item.billingName,
    invoiceDate: new Date(item.invoiceDate).toLocaleDateString(),
    totalAmount: item.totalAmount,
    netAmount: item.netAmount,
  }));

  const columns = [
    {
      field: "invoiceNo",
      headerName: "Invoice No",
      width: 150,
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "orderNo",
      headerName: "Order No",
      width: 150,
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "billingName",
      headerName: "Billing Name",
      width: 200,
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      width: 150,
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
      flex: 1,
      type: "number",
      headerClassName: "custom-header",
    },
    {
      field: "netAmount",
      headerName: "Net Amount",
      width: 150,
      flex: 1,
      type: "number",
      headerClassName: "custom-header",
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "custom-header",
      width: 150,
      renderCell: (params) => (
        <>
          <StyledEditIcon
            style={{ cursor: "pointer", marginRight: 8 }}
            onClick={() => navigate(`/invoice-update/${params.row.id}`)}
          />
          <StyledDeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteInvoice(params.row.id)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <StyledDiv>
        <StyledBg>
          <Typography
            variant="h6"
            color="rgb(23, 142, 128)"
            align="left"
            style={{ marginBottom: "12px", fontWeight: "bold" }}
          >
            Invoice Details
          </Typography>
        </StyledBg>
      </StyledDiv>

      <StyledDiv1>
        <Container>
          <TableHeaderContainer>
            <Typography
              variant="h6"
              color="rgb(23, 142, 128)"
              align="left"
              style={{ marginBottom: "12px", fontWeight: "bold" }}
            >
              List Of Data
            </Typography>
            <ButtonFrame>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />} // Adding the Plus Icon
                sx={{
                  backgroundColor: "rgb(14 57 52)", // Dark Green Color
                  color: "#fff", // White Text and Icon
                  "&:hover": {
                    backgroundColor: "#fff", // Slightly darker green on hover
                    color: "rgb(14 57 52)",
                    fontWeight: "bold",
                    border: "2px solid rgb(14 57 52)", // Dark Green border on hover
                  },
                }}
                onClick={() => {
                  //   setModalTitle("Add");
                  //   setOpen(true);

                  navigate("/invoice-create");
                }}
              >
                Create
              </Button>
            </ButtonFrame>
          </TableHeaderContainer>
          <TableContainer>
            {!rows?.length ? (
              <p>No Data</p>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pagination
                paginationMode="client"
                rowsPerPageOptions={[5, 10, 20]} // Options for the number of rows per page
                autoHeight
                headerHeight={50}
                sx={{
                  "& .custom-header": {
                    color: "rgb(23, 142, 128)", // Text color for column headers
                    backgroundColor: "#c3e6cb", // Background color for column headers
                    fontWeight: "bold",
                  },
                }}
              />
            )}
          </TableContainer>
        </Container>
      </StyledDiv1>
    </>
  );
};

export default InvoiceHome;

const StyledDiv1 = styled.div`
  padding: 20px 16px;
  background: #d9dddb;
`;

const StyledDiv = styled.div`
  padding: 24px 16px;
  background: #d9dddb;
`;

const StyledBg = styled.div`
  padding: 24px 16px;
  margin-right: 7px;
  background: #fff;
`;

const TableFrame = styled.div`
  display: flex;
  position: relative;
  align-items: ${({ position }) => (position ? "start" : "center")};
  flex-direction: column;
  box-shadow: 0px 22px 45px -15px #dddde2;
  background-color: #ffffff;
  margin-top: 15px;
  padding: 16px;
  max-width: 99.5% !important;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  align-items: ${({ position }) => (position ? "start" : "center")};
  flex-direction: column;
  font-family: "Nunito";
  box-shadow: 0px 22px 45px -15px #dddde2;
  background-color: #ffffff;
  margin-top: 15px;
  padding: 20px;
  max-width: 99.5% !important;
`;

const TableHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 12px;
`;

const Heading = styled.h2`
  margin-top: -3px;
  margin-bottom: 0;
  display: flex;
  color: #178e80;
  font-family: "Montserrat-SemiBold";
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
`;

const ButtonFrame = styled.div`
  position: relative;
  left: -1px;
`;

const TableContainer = styled.div`
  background: #fff;
  width: 100%;
`;

const StyledEditIcon = styled(BorderColorOutlinedIcon)`
  color: rgb(23, 142, 128); // Set color for edit icon
`;

const StyledDeleteIcon = styled(DeleteForeverOutlinedIcon)`
  color: rgb(23, 142, 128); // Set color for delete icon
`;
