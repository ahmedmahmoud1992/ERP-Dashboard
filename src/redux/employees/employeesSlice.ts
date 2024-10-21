import { createSlice } from "@reduxjs/toolkit";
import { addEmployee, deleteEmployee, fetchEmployee, fetchEmployees, fetchEmployeesCount } from "./employeesActions";
import { type Employee, type EmployeesState } from "../../types";


const initialState: EmployeesState = {
  employees: [],
  isLoading: false,
  pagesCount: null,
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchEmployeesCount.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchEmployeesCount.fulfilled, (state, action) => {
      state.pagesCount = action.payload? Math.ceil(action.payload / 10): action.payload;
      state.isLoading = false;
    })
    .addCase(fetchEmployeesCount.rejected, (state, action) => {
      console.error("Failed to add employee:", action.error.message);
      state.isLoading = false;
    })
    .addCase(addEmployee.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addEmployee.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(addEmployee.rejected, (state, action) => {
      console.error("Failed to add employee:", action.error.message);
      state.isLoading = false;
    })
    .addCase(fetchEmployees.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employees = action.payload as Employee[];
      state.isLoading = false;
    })
    .addCase(fetchEmployees.rejected, (state, action) => {
      console.error("Failed to fetch all employees:", action.error.message);
      state.isLoading = false;
    })
    .addCase(fetchEmployee.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchEmployee.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchEmployee.rejected, (state, action) => {
      console.error("Failed to fetch employee:", action.error.message);
      state.isLoading = false;
    })
    .addCase(deleteEmployee.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteEmployee.fulfilled, (state) => {
      // state.employees = state.employees.filter((employee) => employee.id !== action.payload);
      state.isLoading = false;
    })
    .addCase(deleteEmployee.rejected, (state, action) => {
      console.error("Failed to delete the employee:", action.error.message);
      state.isLoading = false;
    });
  },
});

export default employeesSlice.reducer;
