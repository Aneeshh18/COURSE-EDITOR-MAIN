import React from "react";
import { Autocomplete, Chip, TextField, Stack } from "@mui/material";

const TagsAutocomplete = ({ options }) => {
  const [value, setValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setValue([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        a
        options={options}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              label={option}
              {...getTagProps({ index })}
              onDelete={() => {
                const newValue = [...value];
                newValue.splice(index, 1);
                setValue(newValue);
              }}
            />
          ))
        }
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Press 'Enter' to add tag"
            onKeyDown={handleKeyDown}
          />
        )}
      />
    </Stack>
  );
};

export default TagsAutocomplete;
