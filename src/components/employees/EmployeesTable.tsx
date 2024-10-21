import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useCallback, useEffect } from "react";
import classes from "./EmployeesTable.module.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import {
  DeleteOutline as DeleteOutlineIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import CustomPagination from "../reusable/Pagination";
import {
  deleteEmployee,
  fetchEmployees,
  fetchEmployeesCount,
} from "../../redux/employees/employeesActions";
import { Link } from "react-router-dom";
import { type BasicTableProps } from "../../types";

export default function BasicTable({
  currentPage,
  onChangePage,
  filter,
}: BasicTableProps) {
  const dispatch = useAppDispatch();
  const pagesCount = useAppSelector((state) => state.employees.pagesCount);
  const employees = useAppSelector((state) => state.employees.employees);

  const handlePageChange = useCallback(
    (newPage: number) => {
      onChangePage(newPage);
      dispatch(fetchEmployees({filter, pageNumber: newPage }));
    },
    [dispatch, onChangePage, filter]
  );

  const handleDeleteEmployee = useCallback(
    (id: string) => {
      dispatch(deleteEmployee(id)).then(() => {
        dispatch(fetchEmployeesCount({ filter })).then(() => {
          if (currentPage > 1 && employees.length === 1) {
            onChangePage(currentPage - 1);
            dispatch(fetchEmployees({ filter, pageNumber: currentPage - 1 }));
          } else {
            dispatch(fetchEmployees({ filter, pageNumber: currentPage }));
          }
        });
      });
    },
    [dispatch, filter, currentPage, onChangePage, employees.length]
  );

  useEffect(() => {
    dispatch(fetchEmployeesCount({ filter }));
  }, [dispatch, filter]);

  useEffect(() => {
    if (pagesCount) {
      dispatch(fetchEmployees({ filter, pageNumber: currentPage }));
    }
  }, [pagesCount]);

  return (
    <TableContainer
      component={Paper}
      elevation={1}
      sx={{
        maxWidth: "100vw",
        overflow: "auto",
        boxShadow:
          "0px 0px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.05),0px 1px 3px 0px rgba(0,0,0,0.05)",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>E-Mail</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Active</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!employees.length && currentPage === 1 ? (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={6}>
                <p>No Employees!</p>
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className={`${classes["table-cell"]}`}>
                  <Link to={`/employees/${employee.id}`}>
                    <div className={classes["img-and-name"]}>
                      <img src={employee.image || "/placeholder.jpg"} />
                      {employee.name}
                    </div>
                  </Link>
                </TableCell>
                <TableCell className={`${classes["table-cell"]}`}>
                  <Link to={`/employees/${employee.id}`}>{employee.role}</Link>
                </TableCell>
                <TableCell className={`${classes["table-cell"]}`}>
                  <Link to={`/employees/${employee.id}`}>{employee.email}</Link>
                </TableCell>
                <TableCell className={`${classes["table-cell"]}`}>
                  <Link to={`/employees/${employee.id}`}>{employee.phone}</Link>
                </TableCell>
                <TableCell className={`${classes["table-cell"]}`}>
                  <Link to={`/employees/${employee.id}`}>
                    {employee.startDate}
                  </Link>
                </TableCell>

                <TableCell className={`${classes["table-cell"]}`}>
                  <Link to={`/employees/${employee.id}`}>
                    {employee.isActive ? (
                      <CheckCircleIcon sx={{ color: "green" }} />
                    ) : (
                      <CancelIcon sx={{ color: "red" }} />
                    )}
                  </Link>
                </TableCell>
                <TableCell className={`${classes["table-cell"]}`}>
                  <Button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    sx={{ padding: "0", width: "fit-content", minWidth: "" }}
                  >
                    <DeleteOutlineIcon sx={{ color: "gray" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {pagesCount && pagesCount > 1 ? (
        <div style={{ margin: "auto" }}>
          <CustomPagination
            count={pagesCount}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      ) : undefined}
    </TableContainer>
  );
}
