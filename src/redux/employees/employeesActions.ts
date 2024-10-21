import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase, storageURL } from "./../../../supabaseClient";
import { EmployeePayload } from "../../types";

export const fetchEmployeesCount = createAsyncThunk(
  "data/fetchEmployeesCount",
  async ({ filter = "" }: { filter?: string }) => {
    const { count, error } = await supabase
      .from("employees")
      .select("*", { count: "exact", head: true })
      .ilike("name", `%${filter}%`);
// console.log(filter);

    if (error) {
      throw new Error(error.message);
    }
    return count;
  }
);

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async ({
    pageNumber = 1,
    filter = "",
  }: {
    pageNumber?: number;
    filter?: string;
  }) => {
    const rowsPerPage = 10;
    const maxRange: number = pageNumber! * rowsPerPage - 1;
    const minRange = maxRange - rowsPerPage + 1;

    let { data: employees, error } = await supabase
      .from("employees")
      .select("*")
      .ilike("name", `%${filter}%`)
      .range(minRange, maxRange);
    // console.log(filter);
    
    if (error) {
      throw new Error(error.message);
    }
    return employees;
  }
);

export const fetchEmployee = createAsyncThunk(
  "employees/fetchEmployee",
  async (id: string) => {
    let { data: employee, error } = await supabase
      .from("employees")
      .select("*")
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
    return employee;
  }
);
export const setActiveEmployee = createAsyncThunk(
  "employees/setActiveEmployee",
  async ({ id, isActive }: { id: string; isActive: boolean }) => {
    let { data: employee, error } = await supabase
      .from("employees")
      .update({ isActive: isActive })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
    return employee;
  }
);
export const addEmployee = createAsyncThunk(
  "employees/add",
  async (
    {
      employeeData,
      uploadedFile,
    }: {
      employeeData: EmployeePayload;
      uploadedFile: File | null;
    },
    { rejectWithValue }
  ) => {
    let imagePath = "";

    if (uploadedFile) {
      const { data, error } = await supabase.storage
        .from("ERPDashboard-images")
        .upload(crypto.randomUUID(), uploadedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        return rejectWithValue(`Error uploading file: ${error.message}`);
      }

      imagePath = `${storageURL}${data.fullPath}`;
    }

    const { data, error } = await supabase
      .from("employees")
      .insert([{ ...employeeData, image: imagePath }])
      .select();

    if (error) {
      return rejectWithValue(error.message);
    }    
    return data[0].id;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id: string, { rejectWithValue }) => {
    const { data: employee, error: fetchError } = await supabase
      .from("employees")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError) {
      return rejectWithValue(fetchError.message);
    }

    const imagePath = employee?.image.split("/").pop();

    if (imagePath) {
      const { error: deleteImageError } = await supabase.storage
        .from("ERPDashboard-images")
        .remove([imagePath]);

      if (deleteImageError) {
        return rejectWithValue(
          `Error deleting image: ${deleteImageError.message}`
        );
      }
    }

    const { error: deleteError } = await supabase
      .from("employees")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return rejectWithValue(deleteError.message);
    }

    return id;
  }
);
