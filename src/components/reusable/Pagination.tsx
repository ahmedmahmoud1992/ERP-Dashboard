import { type ChangeEvent, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { type CustomPaginationProps } from "../../types";


export default function CustomPagination({
  count,
  page,
  onChange: onPageChange,
}: CustomPaginationProps) {
  const [currPage, setCurrPage] = useState<number>(page);
  const handlePageChange = (_: ChangeEvent<unknown>, newPage: number) => {
    setCurrPage(newPage);
    onPageChange(newPage);
  };
  return (
    <Pagination
      count={count}
      page={currPage}
      variant="outlined"
      color="primary"
      onChange={handlePageChange}
      sx={{display: 'flex', justifyContent: 'center', marginBlock: '.6rem .4rem'}}
    />
  );
}
