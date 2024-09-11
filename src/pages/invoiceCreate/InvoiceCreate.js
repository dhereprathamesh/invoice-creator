import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";
import InvoiceForm from "./InvoiceForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const InvoiceCreate = () => {
  const [files, setFiles] = useState([]);
  const [inputFeilds, setInputFeilds] = useState([
    {
      description: "",
      unitPrice: "",
      quantity: "",
      discount: "",
      netAmount: "",
      taxRate: "",
      taxRAmount: "",
      totalAmount: "",
    },
  ]);
  const { id } = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    unregister,
    watch,
  } = useForm({
    defaultValues: {
      items: [
        {
          description: "",
          unitPrice: "",
          quantity: "",
          discount: "",
          netAmount: "",
          totalAmount: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");
  console.log("watchedItems", watchedItems);
  const placeOfSupply = watch("placeOfSupply");
  const placeOfDelivery = watch("placeOfDelivery");

  // Function to calculate netAmount and update value
  const calculateNetAmount = (index) => {
    const item = watchedItems[index];
    const unitPrice = parseFloat(item.unitPrice) || 0;
    const quantity = parseFloat(item.quantity) || 0;
    const discount =
      typeof item.discount === "string"
        ? parseFloat(item.discount.replace("%", ""))
        : 0;

    const discountAmount = (unitPrice * quantity * discount) / 100;
    const netAmount = unitPrice * quantity - discountAmount;

    const isSamePlace = placeOfSupply === placeOfDelivery;
    // Define tax rate percentages
    const cgstSgstRate = 9; // 9% for CGST and 9% for SGST
    const igstRate = 18; // 18% for IGST

    // Calculate tax based on the place of supply/delivery
    const taxRatePercentage = isSamePlace ? cgstSgstRate : igstRate;

    // Calculate the tax amount
    const taxAmount = isSamePlace
      ? (netAmount * cgstSgstRate * 2) / 100 // CGST + SGST
      : (netAmount * igstRate) / 100;

    // Calculate total amount
    const totalAmount = netAmount + taxAmount;

    setValue("totalAmount", totalAmount);
    setValue("taxRate", taxRatePercentage);
    setValue("taxAmount", taxAmount);

    // Set value for netAmount
    setValue(`items.${index}.netAmount`, netAmount.toFixed(2));
  };

  useEffect(() => {
    if (Array.isArray(watchedItems)) {
      watchedItems.forEach((_, index) => calculateNetAmount(index));
    } else {
      console.error("watchedItems is not an array:", watchedItems);
    }
  }, [watchedItems, setValue, placeOfSupply, placeOfDelivery]);

  const handleImages = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  const addMoreItem = () => {
    setInputFeilds([
      ...inputFeilds,
      { description: "", unitPrice: "", quantity: "", discount: "" }, // Add a new item
    ]);
  };

  const handledeleteItem = () => {
    if (inputFeilds.length > 1) {
      // Remove the last item visually
      const newItems = inputFeilds.slice(0, -1);
      setInputFeilds(newItems);

      // Unregister the last item from react-hook-form (so its values are no longer tracked)
      unregister(`items[${inputFeilds.length - 1}].description`);
      unregister(`items[${inputFeilds.length - 1}].unitPrice`);
      unregister(`items[${inputFeilds.length - 1}].quantity`);
      unregister(`items[${inputFeilds.length - 1}].discount`);
    } else {
      // Reset form if only one item is left
      reset();
      setInputFeilds([
        { description: "", unitPrice: "", quantity: "", discount: "" },
      ]); // Reset items state
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCreateInvoice = async (formdata) => {
    try {
      const companyLogoBase64 =
        formdata.companyLogo.length > 0
          ? await toBase64(formdata.companyLogo[0])
          : "";
      const signatureBase64 =
        formdata.signature.length > 0
          ? await toBase64(formdata.signature[0])
          : "";

      const data = {
        companyLogo: companyLogoBase64,
        name: formdata.name,
        address: formdata.address,
        city: formdata.city,
        state: formdata.state,
        pincode: formdata.pincode,
        panNo: formdata.panNo,
        gstRegistrationNo: formdata.gstRegistrationNo,
        placeOfSupply: formdata.placeOfSupply,
        billingName: formdata.billingName,
        billingAddress: formdata.billingAddress,
        billingCity: formdata.billingCity,
        billingState: formdata.billingState,
        billingPincode: formdata.billingPincode,
        billingStateUtCode: formdata.billingStateUtCode,
        shippingName: formdata.shippingName,
        shippingAddress: formdata.shippingAddress,
        shippingCity: formdata.shippingCity,
        shippingState: formdata.shippingState,
        shippingPincode: formdata.shippingPincode,
        shippingStateUtCode: formdata.shippingStateUtCode,
        orderNo: formdata.orderNo,
        orderDate: formdata.orderDate,
        invoiceNo: formdata.invoiceNo,
        invoiceDetails: formdata.invoiceDetails,
        invoiceDate: formdata.invoiceDate,
        reverseCharge: formdata.reverseCharge.id,
        netAmount: formdata.netAmount,
        taxRate: formdata.taxRate,
        taxRAmount: formdata.taxRAmount,
        totalAmount: formdata.totalAmount,
        signature: signatureBase64,
        items: formdata.items,
      };

      if (id) {
        // Update API call
        await axios.put(
          `http://localhost:8080/api/invoice/invoice-update/${id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Invoice updated successfully.");
      } else {
        // Create API call
        await axios.post(
          `http://localhost:8080/api/invoice/create-invoice`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Invoice created successfully.");
      }

      // Optionally reset form or provide feedback
      reset();
    } catch (error) {
      console.error("Error processing invoice:", error);
    }
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
            setValue={setValue}
            register={register}
            handleSubmit={handleSubmit}
            control={control}
            reset={reset}
            handleCreateInvoice={handleCreateInvoice}
            // handleImages={handleImages}
            setFiles={setFiles}
            addMoreItem={addMoreItem}
            inputFeilds={inputFeilds}
            handledeleteItem={handledeleteItem}
            id={id}
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
