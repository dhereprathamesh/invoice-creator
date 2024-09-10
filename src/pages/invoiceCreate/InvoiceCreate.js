import { Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import InvoiceForm from "./InvoiceForm";

const InvoiceCreate = () => {
  const [files, setFiles] = useState([]);
  const { register, setValue, handleSubmit, control, reset } = useForm();

  const handleImages = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  const handleCreateInvoice = (formdata) => {
    // Combine form data and files
    console.log("Form Data:", formdata);
    console.log("Files:", files);
  };
  return (
    <StyledDiv>
      <StyledBg>
        <Typography
          variant="h6"
          color="rgb(23, 142, 128)"
          align="left"
          style={{ marginBottom: "12px", fontWeight: "bold" }}
        >
          <InvoiceForm
            register={register}
            handleSubmit={handleSubmit}
            control={control}
            reset={reset}
            handleCreateInvoice={handleCreateInvoice}
            handleImages={handleImages}
            setFiles={setFiles}
          />
        </Typography>
      </StyledBg>
    </StyledDiv>
  );
};

export default InvoiceCreate;

const StyledDiv = styled.div`
  padding: 24px 16px;
  background: #d9dddb;
`;

const StyledBg = styled.div`
  padding: 24px 16px;
  margin-right: 7px;
  background: #fff;
`;
