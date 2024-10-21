import {type ReactNode} from 'react';

export interface FormValues {
  name: string;
  startDate: string;
  role: string;
  email: string;
  phone: string;
}

export interface Action {
  type: "name" | "startDate" | "role" | "email" | "phone";
  payload: string;
}
export interface AddEmployeeStepperProps {
  currentPage: number;
  filter: string;
}

export interface BasicTableProps {
    currentPage: number;
    filter: string;
    onChangePage: (page: number) => void;
  }

  export interface InputFieldProps {
    label: string;
    placeholder?: string;
    required?: boolean;
    type?: 'text' | 'number' | 'date'| 'email' | 'select';
    options?: string[];
    value: string;
    onChange: (value: string) => void;
  }

  export interface InputFileUploadProps {
    text: string;
    multiple?: boolean;
    onchangeInput: (files: FileList | null)=> void;
  }

  export interface CustomModalProps {
    buttonText: string;
    children: ReactNode;
}

export interface CustomPaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
}
export interface CustomStepperProps {
  steps: string[];
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleFinish: () => void;
  isComplete: boolean;
  nonLinear?: boolean;
  children: ReactNode[];
}

export interface EmployeePayload {
    name: string;
    startDate: string;
    role: string;
    email: string;
    phone: string;
    isActive: boolean;
  }
  export interface Employee extends EmployeePayload {
    id: string;
    image: string;
  }
  
  export interface EmployeesState {
    employees: Employee[];
    isLoading: boolean;
    pagesCount: number | null;
  }