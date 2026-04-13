import React, { useEffect, useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  error,
  setValue,
  getValue,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [register, name]);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList, setValue, name]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <sub>*</sub>
      </label>

      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full rounded-md bg-[#2C333F] px-3 py-2 text-richblack-5 border border-richblack-600"
        />

        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50 bg-yellow-500 px-3 py-1 rounded-md text-sm mt-2"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((item, index) => (
            <li key={index} className="flex items-center text-richblack">
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs text-pure-greys-300 bg-[#2C333F]"
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {error?.[name] &&   
      (<span>{label} 
      is required</span>)}
    </div>
  );
};

export default RequirementField;