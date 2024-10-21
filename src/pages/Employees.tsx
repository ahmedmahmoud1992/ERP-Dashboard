import { type FormEvent, useState } from "react";
import CustomModal from "../components/reusable/Modal";
import AddEmployeeStepper from "../components/employees/AddEmployeeStepper";
import EmployeesTable from "../components/employees/EmployeesTable";
import { useAppDispatch } from "../redux/hooks";
import { fetchEmployees } from "../redux/employees/employeesActions";

const Employees = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  }
  const handleSearchInputChange = ({currentTarget}: FormEvent<HTMLInputElement>) => {
    const target = currentTarget as HTMLInputElement;
    dispatch(fetchEmployees({filter: target.value}));
    setFilter(target.value)
  }
  return (
    <>
      <h2 className="content-title">Employees</h2>
      {/* <br /> */}
    <header className="header">
      <input type="text" id="search-employees" placeholder="Search employees" onInput={handleSearchInputChange} />
      <CustomModal buttonText="+ New Employees">
        <AddEmployeeStepper />
      </CustomModal>
    </header>
    <EmployeesTable filter={filter} currentPage={currentPage} onChangePage={handleCurrentPage} />
    </>
  );
};

export default Employees;
