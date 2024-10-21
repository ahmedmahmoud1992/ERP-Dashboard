import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  fetchEmployee,
  setActiveEmployee,
} from "../redux/employees/employeesActions";
import { Paper } from "@mui/material";
import CustomSwitch from "../components/reusable/Switch";
import { type Employee } from "../types";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const dispatch = useAppDispatch();
  const [employee, setEmployee] = useState<Employee | null>(null);

  const [isEmployeeActive, setIsEmployeeActive] = useState<boolean>(false);

  const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmployeeActive(event.target.checked);
    dispatch(
      setActiveEmployee({ id: employeeId!, isActive: !isEmployeeActive })
    );
  };
  useEffect(() => {
    if (employeeId && !employee) {
      dispatch(fetchEmployee(employeeId))
        .unwrap()
        .then((emp) => {
          setEmployee(emp![0]);
          setIsEmployeeActive(emp![0].isActive);
        });
    }
  }, [isEmployeeActive]);
  return (
    <>
      <div className="d-flex">
        <h2>Employees</h2>
        <h3 className="disabled">&gt;</h3>
        <h3 className="disabled">{employee?.name}</h3>
      </div>
      <header className="header"></header>

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
                    src={employee?.image || "/placeholder.jpg"}
                    alt="Employee"
                    style={{ width: "35px", height: "35px" }}
                  />
                  {employee?.name}
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Role</td>
              <td>{employee?.role}</td>
            </tr>
            <tr>
              <td>E-Mail</td>
              <td>{employee?.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{employee?.phone}</td>
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
                <td>{employee?.startDate}</td>
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
    </>
  );
};

export default EmployeeDetails;
