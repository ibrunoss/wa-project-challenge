import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";

export const NumberFieldStyledInput = styled(TextField)`
  input {
    height: 100px;
    width: 100px;
    cursor: pointer;
    font-size: 50px;
    text-align: center;
  }
`;

export const NumberFieldStyledLabel = styled("div")`
  position: absolute;
  color: #c1c1c1;
  font-size: 50px;
`;
