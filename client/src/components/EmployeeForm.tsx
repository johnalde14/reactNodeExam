import React, { useState } from "react";
import axios from "axios";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onInput={onChange}
    />
  </div>
);

function EmployeeForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { id, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [id]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFile(file);
  };

  const handleSubmit = async () => {
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please fill in all required fields");
      return;
    }
    if (!formData.email.match("@")) {
      alert("Please enter a valid email");
      return;
    }
    if (!file) {
      alert("Please input image");
      return;
    }

    const data = new FormData();

    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("middle_name", formData.middle_name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    if (file) data.append("file", file);

    try {
      await axios({
        method: "POST",
        url: "http://localhost:3000/api/employee/createEmployee",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        alert("success");
        setFormData({
          first_name: "",
          last_name: "",
          middle_name: "",
          email: "",
          phone: "",
        });
        setFile(null);
        const imageInput = document.getElementById("image") as HTMLInputElement;
        if (imageInput) imageInput.value = "";
      });
    } catch (error) {
      alert("Error submitting data:" + error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card" style={{ width: "24rem" }}>
        <div className="card-body">
          <h5 className="card-title">Employee Form</h5>
          <InputField
            id="first_name"
            label="First Name"
            value={FormData.first_name}
            onChange={handleChange}
          />
          <InputField
            id="last_name"
            label="Last Name"
            value={FormData.last_name}
            onChange={handleChange}
          />
          <InputField
            id="middle_name"
            label="Middle Name"
            value={FormData.middle_name}
            onChange={handleChange}
          />
          <InputField
            id="email"
            label="Email"
            value={FormData.email}
            onChange={handleChange}
          />
          <InputField
            id="phone"
            label="Phone"
            type="number"
            value={FormData.phone}
            onChange={handleChange}
          />
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Insert Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-3">
            <button
              className="btn btn-primary mt-2 w-100"
              type="submit"
              onClick={handleSubmit}
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
