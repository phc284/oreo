import React from 'react';
const handleChange = handler => ({ target: { files } }) => {
  handler(files.length ? { file: files[0], name: files[0].name } : {});
};

const FileUpload = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      type="file"
      accept="image/jpg, image/jpeg, image/png"
      onChange={handleChange(onChange)}
      onBlur={handleChange(onBlur)}
      {...props.input}
      {...props}
    />
  );
};

export default FileUpload;
