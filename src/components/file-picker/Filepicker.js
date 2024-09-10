import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { BsFileImage } from "react-icons/bs"; // Image icon

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

export const FilePicker = ({ onFiles }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      onFiles(acceptedFiles); // Callback to pass the selected images to parent component
    },
  });

  useEffect(() => {
    // Cleanup function to revoke object URLs
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <PickerWrap>
      <div {...getRootProps({ className: "dropzone" })}>
        <BsFileImage className="FileIcon" />
        <input {...getInputProps()} />
        <TextDiv>
          <p>
            Drag and drop, or <StyledSpan>browse</StyledSpan> your images
          </p>
          <StyledSpan>Supported formats: PNG, JPEG</StyledSpan>
        </TextDiv>
      </div>
      <aside style={thumbsContainer}>
        {files.map((file) => (
          <div key={file.name}>
            <img
              src={file.preview}
              alt={file.name}
              style={{ width: "100px", margin: "10px" }}
            />
          </div>
        ))}
      </aside>
    </PickerWrap>
  );
};

const PickerWrap = styled.div`
  border-radius: 10px;
  width: 100%;

  .dropzone {
    min-height: 70px;
    cursor: pointer;
    padding: 5px 20px;
    background: #effff4;
    border: 1.5px dotted #269400;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 10px;
  }
  .FileIcon {
    font-size: 50px;
    color: #24aa9a;
    padding: 5px;
  }
`;
const TextDiv = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin: 0px;
    font-size: 14px;
    word-wrap: break-word;
  }
`;
const StyledSpan = styled.span`
  color: #269400;
  font-size: 9px;
`;

export default FilePicker;
