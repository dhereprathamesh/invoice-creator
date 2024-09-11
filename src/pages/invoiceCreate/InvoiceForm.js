import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFileImage } from "react-icons/bs";
import FilePicker from "../../components/file-picker/Filepicker";
import { Grid, Button, Typography } from "@mui/material";
import Input from "../../components/form-components/input";
import DatePickerInput from "../../components/date-picker/DatePicker";
import DropDown from "../../components/dropdown/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const InvoiceForm = ({
  setValue,
  register,
  handleSubmit,
  handleCreateInvoice,
  handleFiles,
  control,
  setFiles,
  handleImages,
  inputFeilds,
  addMoreItem,
  handledeleteItem,
  watchedItems,
  id,
}) => {
  const navigate = useNavigate();

  const reverseCharge_OBj = [
    { value: "Yes", label: "Yes", id: "yes" },
    { value: "No", label: "No", id: "no" },
  ];

  // useEffect(() => {
  //   watchedItems.forEach((item, index) => {
  //     console.log("item", item);

  //     // Ensure values are strings before parsing
  //     const unitPrice = parseFloat(item.unitPrice) || 0;
  //     const quantity = parseFloat(item.quantity) || 0;
  //     const discount = parseFloat(item.discount.replace("%", "").trim()) || 0;

  //     console.log(
  //       `unitPrice: ${unitPrice}, quantity: ${quantity}, discount: ${discount}`
  //     );
  //   });
  // }, [watchedItems]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/invoice/getSingleinvoiceById/${id}`)
        .then((response) => {
          const data = response.data.data;
          console.log("update", data);

          // Prefill form data
          setValue("companyLogo", data.companyLogo);
          setValue("name", data.name);
          setValue("address", data.address);
          setValue("city", data.city);
          setValue("state", data.state);
          setValue("pincode", data.pincode);
          setValue("panNo", data.panNo);
          setValue("gstRegistrationNo", data.gstRegistrationNo);
          setValue("placeOfSupply", data.placeOfSupply);
          setValue("billingName", data.billingName);
          setValue("billingAddress", data.billingAddress);
          setValue("billingCity", data.billingCity);
          setValue("billingState", data.billingState);
          setValue("billingPincode", data.billingPincode);
          setValue("billingStateUtCode", data.billingStateUtCode);
          setValue("shippingName", data.shippingName);
          setValue("shippingAddress", data.shippingAddress);
          setValue("shippingCity", data.shippingCity);
          setValue("shippingState", data.shippingState);
          setValue("shippingPincode", data.shippingPincode);
          setValue("shippingStateUtCode", data.shippingStateUtCode);
          setValue("orderNo", data.orderNo);
          setValue("orderDate", data.orderDate);
          setValue("invoiceNo", data.invoiceNo);
          setValue("invoiceDetails", data.invoiceDetails);
          setValue("invoiceDate", data.invoiceDate);
          setValue("reverseCharge", data.reverseCharge);
          setValue("netAmount", data.netAmount);
          setValue("taxRate", data.taxRate);
          setValue("taxRAmount", data.taxRAmount);
          setValue("totalAmount", data.totalAmount);
          setValue("signature", data.signature);

          // Set items details if available
          data.items.forEach((item, index) => {
            setValue(`items[${index}].description`, item.description);
            setValue(`items[${index}].unitPrice`, item.unitPrice);
            setValue(`items[${index}].quantity`, item.quantity);
            setValue(`items[${index}].discount`, item.discount);
            // setValue(`items[${index}].discount`, item.discount);
            // setValue(`items[${index}].discount`, item.discount);
            // setValue(`items[${index}].discount`, item.discount);
            // setValue(`items[${index}].discount`, item.discount);
          });
        })
        .catch((error) => {
          console.error("Error fetching invoice data:", error);
        });
    }
  }, [id, setValue]);

  return (
    <form onSubmit={handleSubmit(handleCreateInvoice)}>
      <Container position>
        <Grid
          container
          mb={2}
          px={1}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item sx={{ position: "relative" }} xs={12}>
            <Input
              label="Name"
              name="companyLogo"
              id="companyLogo"
              inputRef={register("companyLogo")}
              type={"file"}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12}>
            <Typography
              variant="h6"
              color="#11555f"
              align="left"
              style={{
                marginBottom: "23px",
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              Selling Details
            </Typography>
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Name"
              name="name"
              id="Name"
              placeholder="Enter Name"
              inputRef={register("name")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Address"
              name="address"
              id="Address"
              placeholder="Enter Address"
              inputRef={register("address")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="City"
              name="city"
              id="City"
              placeholder="Enter City"
              inputRef={register("city")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="State"
              name="state"
              id="State"
              placeholder="Enter State"
              inputRef={register("state")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Pincode"
              name="pincode"
              id="Pincode"
              placeholder="Enter Pincode"
              inputRef={register("pincode")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="PAN No"
              name="panNo"
              id="panNo"
              placeholder="Enter PAN No"
              inputRef={register("panNo")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="GST Registration No"
              name="gstRegistrationNo"
              id="gstRegistrationNo"
              placeholder="Enter GST Registration No"
              inputRef={register("gstRegistrationNo")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Place of Supply"
              name="placeOfSupply"
              id="placeOfSupply"
              placeholder="Enter Place of Supply"
              inputRef={register("placeOfSupply")}
            />
          </Grid>

          {/* **************************** Billing Details ************************** */}
          <Grid item sx={{ position: "relative" }} xs={12}>
            <Typography
              variant="h6"
              color="#11555f"
              align="left"
              style={{
                marginBottom: "23px",
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              Billing Details
            </Typography>
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Name"
              name="billingName"
              id="billingName"
              placeholder="Enter Name"
              inputRef={register("billingName")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Address"
              name="billingAddress"
              id="billingAddress"
              placeholder="Enter Address"
              inputRef={register("billingAddress")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="City"
              name="billingCity"
              id="billingCity"
              placeholder="Enter City"
              inputRef={register("billingCity")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="State"
              name="billingState"
              id="billingState"
              placeholder="Enter State"
              inputRef={register("billingState")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Pincode"
              name="billingPincode"
              id="billingPincode"
              placeholder="Enter Pincode"
              inputRef={register("billingPincode")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="State/UT Code"
              name="billingStateUtCode"
              id="billingStateUtCode"
              placeholder="Enter State/UT Code"
              inputRef={register("billingStateUtCode")}
            />
          </Grid>
          {/* **************************** Shipping Details ************************** */}
          <Grid item sx={{ position: "relative" }} xs={12}>
            <Typography
              variant="h6"
              color="#11555f"
              align="left"
              style={{
                marginBottom: "23px",
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              Shipping Details
            </Typography>
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Name"
              name="shippingName"
              id="shippingName"
              placeholder="Enter Name"
              inputRef={register("shippingName")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Address"
              name="shippingAddress"
              id="shippingAddress"
              placeholder="Enter Address"
              inputRef={register("shippingAddress")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="City"
              name="shippingCity"
              id="shippingCity"
              placeholder="Enter City"
              inputRef={register("shippingCity")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="State"
              name="shippingState"
              id="shippingState"
              placeholder="Enter State"
              inputRef={register("shippingState")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Pincode"
              name="shippingPincode"
              id="shippingPincode"
              placeholder="Enter Pincode"
              inputRef={register("shippingPincode")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="State/UT Code"
              name="shippingStateUtCode"
              id="shippingStateUtCode"
              placeholder="Enter State/UT Code"
              inputRef={register("shippingStateUtCode")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Place of Delivery"
              name="placeOfDelivery"
              id="placeOfDelivery"
              placeholder="Enter Place of Delivery"
              inputRef={register("placeOfDelivery")}
            />
          </Grid>
          {/* **************************** Order Details ************************** */}
          <Grid item sx={{ position: "relative" }} xs={12}>
            <Typography
              variant="h6"
              color="#11555f"
              align="left"
              style={{
                marginBottom: "23px",
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              Order Details
            </Typography>
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Order NO"
              name="orderNo"
              id="orderNo"
              placeholder="Enter Order NO"
              inputRef={register("orderNo")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <DatePickerInput
              control={control}
              name="orderDate"
              label="Enter Order Date"
              placeholderText="Select Order Date"
            />
          </Grid>
          {/* **************************** Invoice Details ************************** */}
          <Grid item sx={{ position: "relative" }} xs={12}>
            <Typography
              variant="h6"
              color="#11555f"
              align="left"
              style={{
                marginBottom: "23px",
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              Invoice Details
            </Typography>
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Invoice NO"
              name="invoiceNo"
              id="invoiceNo"
              placeholder="Enter Invoice NO"
              inputRef={register("invoiceNo")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <Input
              label="Invoice Details"
              name="invoiceDetails"
              id="invoiceDetails"
              placeholder="Enter Invoice Details"
              inputRef={register("invoiceDetails")}
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <DatePickerInput
              control={control}
              name="invoiceDate"
              label="Enter Invoice Date"
              placeholderText="Select Invoice Date"
            />
          </Grid>
          <Grid item sx={{ position: "relative" }} xs={12} sm={6} md={4}>
            <DropDown
              id="reverseCharge"
              label="Reverse Charge"
              selectObj={reverseCharge_OBj}
              control={control}
              marginBottom={15}
            />
          </Grid>

          {/* **************************** Invoice Details ************************** */}

          <Grid item sx={{ position: "relative" }} xs={12}>
            <Typography
              variant="h6"
              color="#11555f"
              align="left"
              style={{
                marginBottom: "23px",
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              Items Details
            </Typography>
          </Grid>

          {inputFeilds.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={6} md={4}>
                <Input
                  label={`Description ${index + 1}`}
                  name={`items[${index}].description`}
                  inputRef={register(`items[${index}].description`)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Input
                  label={`Unit Price ${index + 1}`}
                  name={`items[${index}].unitPrice`}
                  inputRef={register(`items[${index}].unitPrice`)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Input
                  label={`Quantity ${index + 1}`}
                  name={`items[${index}].quantity`}
                  inputRef={register(`items[${index}].quantity`)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Input
                  label={`Discount ${index + 1}`}
                  name={`items[${index}].discount`}
                  inputRef={register(`items[${index}].discount`)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Input
                  label={`Net Amount ${index + 1}`}
                  name={`items[${index}].netAmount`}
                  inputRef={register(`items[${index}].netAmount`)}
                  fullWidth
                />
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Input
              label="Tax Rate"
              name="taxRate"
              id="taxRate"
              placeholder="Enter Tax Rate"
              inputRef={register("taxRate")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input
              label="Tax Amount"
              name="taxAmount"
              id="taxAmount"
              placeholder="Enter Tax Amount"
              inputRef={register("taxAmount")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input
              label="Total Amount"
              name="totalAmount"
              id="totalAmount"
              placeholder="Enter Total Amount"
              inputRef={register("totalAmount")}
            />
          </Grid>
          {/* Add More Item and Back Buttons */}
          <Grid
            item
            sx={{
              position: "relative",
              display: "flex",
              gap: "2%",
              justifyContent: "end",
              bottom: "40px",
            }}
            xs={12}
          >
            <Button
              variant="outlined"
              color="#0e3934"
              sx={{
                backgroundColor: "#0e3934", // Dark Green
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#0e3934",
                  // fontWeight: "bold",
                  border: "1px solid #0e3934",
                },
              }}
              onClick={addMoreItem} // Add more items on click
            >
              Add More Item
            </Button>

            <Button
              variant="outlined"
              color="#0e3934"
              onClick={handledeleteItem}
            >
              Back
            </Button>
          </Grid>

          <Grid item sx={{ position: "relative" }} xs={12}>
            <Input
              label="Signature"
              name="signature"
              id="signature"
              inputRef={register("signature")}
              type={"file"}
            />
          </Grid>
        </Grid>
        <StyledButton>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "rgb(14 57 52)", // Dark Green Color
              color: "#fff",
              marginRight: "25px", // White Text and Icon
              "&:hover": {
                backgroundColor: "#fff", // Slightly darker green on hover
                color: "rgb(14 57 52)",
                fontWeight: "bold",
                border: "2px solid rgb(14 57 52)",
                marginRight: "25px",
              },
            }}
          >
            {id ? "Update" : "Submit"}
          </Button>
          {id ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
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
              onClick={() => navigate(`/invoice-view/${id}`)}
            >
              View Invoice
            </Button>
          ) : (
            <></>
          )}
        </StyledButton>
      </Container>
    </form>
  );
};

export default InvoiceForm;

export const Container = styled.div`
  display: flex;
  align-items: ${({ position }) => (position ? "start" : "center")};
  flex-direction: column;
  font-family: "Nunito";
  margin: 10px;
  box-shadow: 0px 22px 45px -15px #dddde2;
  background-color: #ffffff;
  border-radius: 15px;
  padding-top: 20px;
  margin-left: 6px;
  margin-right: 37px;
  margin: auto;
`;

// const StyledFilePickerheader = styled.p`
//   margin: 0;
//   left: 3px;
//   font-family: sans-serif;
//   color: #11555f;
//   line-height: 18px;
//   font-size: 12px;
//   font-weight: 600;
//   position: relative;
// `;
const StyledButton = styled.div`
  padding: 10px;
  text-align: center;
`;
