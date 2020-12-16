import { useState } from "react";

const UserFormOperations = (initialvalues, validate,setCurrentId) => {
  const [values, setValues] = useState(initialvalues);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const feildValue = { [name]: value };
    setValues({
      ...values,
      ...feildValue,
    });
    validate(feildValue);
  };
  const resetForm = ()=>{
    setValues({
      ...initialvalues
    });
    setErrors({})
    setCurrentId(0)
  }
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
};

export default UserFormOperations;
