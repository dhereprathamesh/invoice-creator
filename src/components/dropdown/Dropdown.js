import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import styled from "styled-components";

const DropDown = ({
  id,
  label,
  placeholder = "Select",
  selectObj,
  control,
  isMulti,
  maxMenuHeight,
  marginBottom,
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "32px",
      fontSize: "12px",
      fontFamily: "Arial, sans-serif",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "12px",
      fontFamily: "Arial, sans-serif",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "12px",
      PaddingBottom: "2px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: state.isSelected ? "#c3e6cb" : provided.backgroundColor,
      color: state.isSelected ? "#11555f" : provided.color,
      "&:hover": {
        backgroundColor: state.isSelected ? "#fff" : "#c3e6cb",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "12px",
      fontFamily: "Arial, sans-serif",
    }),
  };

  return (
    <ContainerStyled marginBottom={marginBottom}>
      {label ? <label htmlFor={id}>{label}</label> : <></>}
      <Controller
        control={control}
        name={id}
        render={({ field }) => (
          <Select
            {...field}
            id={id}
            isMulti={isMulti}
            placeholder={placeholder ? `Select` : ""}
            options={selectObj}
            maxMenuHeight={maxMenuHeight}
            className="drowpdown"
            styles={customStyles}
          />
        )}
      />
    </ContainerStyled>
  );
};

export default DropDown;

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  top: -20px;
  width: 104%;
  label {
    font-family: sans-serif;
    font-size: 12px;
    z-index: 1;
    color: #11555f;
  }
  .isRequired {
    color: red;
    margin-left: 3px;
  }
`;
