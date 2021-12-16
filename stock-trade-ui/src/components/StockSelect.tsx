import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function StockSelect({ handleChange, symbols, selectedSymbol }) {
  return (
    <div>
      <FormControl style={{ margin: "50px 0 30px 60px", width: "50%" }}>
        <InputLabel id="select-label">Stock</InputLabel>
        <Select labelId="select-label" value={selectedSymbol} label="Stock" onChange={handleChange}>
          {symbols.map((symbol) => (
            <MenuItem value={symbol} key={symbol}>
              {symbol}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default StockSelect;
