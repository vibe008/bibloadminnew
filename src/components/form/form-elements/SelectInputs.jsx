"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import { ChevronDownIcon } from "@/icons";

export default function SelectInputs({items}) {
  const multipleselect  = items?.map(tag => ({
    value: tag._id,
    text: tag.name,
    selected: false,
  }));
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];

  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  // const multipleselect = [
  //   { value: "1", text: "Option 1", selected: false },
  //   { value: "2", text: "Option 2", selected: false },
  //   { value: "3", text: "Option 3", selected: false },
  //   { value: "4", text: "Option 4", selected: false },
  //   { value: "5", text: "Option 5", selected: false },
  // ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <MultiSelect
          label="Multiple Select Options"
          options={multipleselect}
          // defaultSelected={["1", "3"]}
          onChange={(values) => setSelectedValues(values)}
        />
        <p className="sr-only">
          Selected Values: {selectedValues.join(", ")}
        </p>
      </div>
    </div>
  );
}
