import React from "react";
import  countryCodes  from "../../data/countryCodes";

const CountryDropdown = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg px-3 py-2  bg-white/20
                  outline-none focus:ring-2
                 focus:ring-yellow-400"
    >
      {Object.values(countryCodes).map((country) => (
        <option key={country.code} value={country.code}>
          {country.name} ({country.code})
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown
