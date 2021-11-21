import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  NumberFieldStyledLabel,
  NumberFieldStyledInput,
} from "./NumberFieldStyled";
import Box from "@mui/system/Box";

interface NumberFieldProps {
  value: string;
  onChange: (newValue: string) => void;
}

const NumberField = (props: NumberFieldProps) => {
  const { value, onChange } = props;

  const [hiddenLabel, setHiddenLabel] = React.useState(false);

  React.useEffect(() => {
    const hidden = value !== "";

    setHiddenLabel(hidden);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (isValidInput(value)) {
      onChange(value);
    }
  };

  const isValidInput = (value: string): boolean => {
    const justNumbers = /^[0-9]{0,2}$/;

    return (
      (justNumbers.test(value) && +value > 0 && +value <= 50) || value === ""
    );
  };

  const decrement = () => {
    const greaterThanMinimum = +value > 1;

    if (greaterThanMinimum) {
      onChange(`${+value - 1}`);
    }
  };

  const increment = () => {
    const lessThanMaximum = +value < 50;

    if (lessThanMaximum) {
      onChange(`${+value + 1}`);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <IconButton
          color="primary"
          size="large"
          disabled={value === "" || +value < 2}
          onClick={decrement}
        >
          <RemoveIcon />
        </IconButton>
        <NumberFieldStyledLabel hidden={hiddenLabel}>0</NumberFieldStyledLabel>
        <NumberFieldStyledInput value={value} onChange={handleChange} />
        <IconButton
          color="primary"
          size="large"
          disabled={+value === 50}
          onClick={increment}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          color: "GrayText",
          userSelect: "none",
          mt: 2,
        }}
      >
        <Typography mb="0" variant="caption" display="block" gutterBottom>
          min. 1
        </Typography>
        <Typography mb="0" variant="caption" display="block" gutterBottom>
          max. 50
        </Typography>
      </Box>
    </Box>
  );
};

export default NumberField;
