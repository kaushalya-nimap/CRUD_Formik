import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const App = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const [currentBank, setCurrentBank] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const API_URL = "http://localhost:3001/data";

  // Fetch bank details from API
  const fetchBankDetails = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setBankDetails(data);
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  // Add/Edit button handler
  const handleAddEdit = (bank = null) => {
    setCurrentBank(
      bank || {
        id: "",
        bankName: "",
        accountNumberPrefix: "",
        accountNumberLength: "",
      }
    );
    setIsEditing(true);
  };

  // Delete button handler
  const handleDelete = (id) => {
    const updatedBanks = bankDetails.filter((bank) => bank.id !== id);
    setBankDetails(updatedBanks);
  };

  // Validation schema
  const validationSchema = Yup.object({
    bankName: Yup.string().required("Bank Name is required"),
    accountNumberPrefix: Yup.string().required("Account Prefix is required"),
    accountNumberLength: Yup.number()
      .required("Account Number Length is required")
      .positive("Must be a positive number")
      .integer("Must be an integer"),
  });

  // Form submission handler
  const handleFormSubmit = (values) => {
    if (values.id) {
      // Edit existing bank
      const updatedBanks = bankDetails.map((bank) =>
        bank.id === values.id ? values : bank
      );
      setBankDetails(updatedBanks);
    } else {
      // Add new bank
      const newBank = { ...values, id: Date.now().toString() };
      setBankDetails([...bankDetails, newBank]);
    }
    setIsEditing(false);
  };

  return (
    <div className="bank-container">
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Id</th>
            <th>Bank Name</th>
            <th>Account Prefix</th>
            <th>Account Number Length</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {bankDetails.map((bank) => (
            <tr key={bank.id}>
              <td>{bank.id}</td>
              <td>{bank.bankName}</td>
              <td>{bank.accountNumberPrefix}</td>
              <td>{bank.accountNumberLength}</td>
              <td>
                <button onClick={() => handleAddEdit(bank)}>Edit</button>
                <button onClick={() => handleDelete(bank.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleAddEdit()}>Add New</button>

      {isEditing && (
        <Formik
          initialValues={currentBank}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <label>Bank Name:</label>
                <Field name="bankName" type="text" />
                <ErrorMessage name="bankName" component="div" />
              </div>
              <div>
                <label>Account Prefix:</label>
                <Field name="accountNumberPrefix" type="text" />
                <ErrorMessage name="accountNumberPrefix" component="div" />
              </div>
              <div>
                <label>Account Number Length:</label>
                <Field name="accountNumberLength" type="number" />
                <ErrorMessage name="accountNumberLength" component="div" />
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default App;
