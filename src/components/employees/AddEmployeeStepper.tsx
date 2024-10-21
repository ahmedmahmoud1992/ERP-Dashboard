import { useEffect, useReducer, useState } from "react";
import CustomStepper from "../reusable/Stepper";
import InputField from "../reusable/InputField";
import { useAppDispatch } from "../../redux/hooks";
import InputFileUpload from "../reusable/InputFileUpload";
import {addEmployee} from "../../redux/employees/employeesActions";
import { Button, Paper } from "@mui/material";
import {
  AddPhotoAlternateOutlined,
  DeleteOutlined,
  // RepeatOutlined,
} from "@mui/icons-material";
import CustomSwitch from "../reusable/Switch";
import {
  type Action,
  type FormValues,
} from "../../types";
import { useNavigate } from "react-router-dom";

function reducer(state: FormValues, action: Action): FormValues {
  const { type, payload } = action;
  return { ...state, [type]: payload };
}

const initialFormValues: FormValues = {
  name: "",
  startDate: "",
  role: "",
  email: "",
  phone: "",
};

const AddEmployeeStepper = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formState, formDispatch] = useReducer(reducer, initialFormValues);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEmployeeActive, setIsEmployeeActive] = useState<boolean>(false);

  const steps = ["personal data", "image", "preview"];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const file = files[0];
      setUploadedFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setUploadedFile(null);
      setImagePreview(null);
    }
  };

  const allInputsComplete =
    Object.values(formState).every((value) => value.trim() !== "") &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);

  const handleFinish = () => {
    const employeeData = {
      ...formState,
      isActive: isEmployeeActive,
    };

    dispatch(addEmployee({ employeeData, uploadedFile }))
      .unwrap()
      .then((empId) => {
        navigate(`/employees/${empId}`);
      });
  };
  const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmployeeActive(event.target.checked);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <CustomStepper
      steps={steps}
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      handleFinish={handleFinish}
      isComplete={allInputsComplete}
    >
      {/* Step 1 Content */}
      <>
        <InputField
          label="Name"
          placeholder="Enter Employee Name"
          required={true}
          type="text"
          value={formState.name}
          onChange={(value) => formDispatch({ type: "name", payload: value })}
        />
        <InputField
          label="Start Date"
          placeholder="Enter Start Date"
          required={true}
          type="date"
          value={formState.startDate}
          onChange={(value) =>
            formDispatch({ type: "startDate", payload: value })
          }
        />
        <InputField
          label="Role"
          type="select"
          options={["IT", "Software", "Data Entry"]}
          required={true}
          value={formState.role}
          onChange={(value) => formDispatch({ type: "role", payload: value })}
        />
        <InputField
          label="E-Mail"
          placeholder="Enter E-Mail"
          required={true}
          type="email"
          value={formState.email}
          onChange={(value) => formDispatch({ type: "email", payload: value })}
        />
        <InputField
          label="Phone"
          placeholder="Enter Phone"
          required={true}
          type="number"
          value={formState.phone}
          onChange={(value) => formDispatch({ type: "phone", payload: value })}
        />
      </>
      {/* Step 2 Content */}
      <>
        <h5>Add image</h5>
        <div
          className="add-employee-img-container"
          style={{
            padding: "20px",
            border: "1px dashed",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexDirection: imagePreview ? "row" : "column",
          }}
        >
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{
                  width: "80px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
              <div>
                <span>{uploadedFile?.name}</span>
                <div className="action-btns">
                  {/* <Button>
                    <RepeatOutlined />change
                  </Button> */}
                  <Button onClick={() => handleFileChange(null)}>
                    <DeleteOutlined />
                    remove
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <AddPhotoAlternateOutlined />
              <InputFileUpload
                text="+ Add Image"
                onchangeInput={handleFileChange}
              />
            </>
          )}
        </div>
      </>
      {/* Step 3 Content */}
      <Paper variant="outlined">
        <table className="preview-employee">
          <thead>
            <tr>
              <th colSpan={2}>Summary</th>
            </tr>
            <tr>
              <td>Employee</td>
              <td>
                <div className="flex">
                  <img
                    src={imagePreview || "/placeholder.jpg"}
                    alt="Employee"
                    style={{ width: "35px", height: "35px" }}
                  />
                  {formState.name}
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Role</td>
              <td>{formState.role}</td>
            </tr>
            <tr>
              <td>E-Mail</td>
              <td>{formState.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{formState.phone}</td>
            </tr>
          </tbody>
        </table>
        <div className="table-flex-container">
          <table className="preview-employee">
            <thead>
              <tr>
                <th colSpan={2}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>start date</td>
                <td>{formState.startDate}</td>
              </tr>
            </tbody>
          </table>
          <table className="preview-employee">
            <thead>
              <tr>
                <th colSpan={2}>Active</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>active</td>
                <td className="switch-container">
                  <CustomSwitch
                    checked={isEmployeeActive}
                    onChange={handleActiveChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Paper>
    </CustomStepper>
  );
};

export default AddEmployeeStepper;
