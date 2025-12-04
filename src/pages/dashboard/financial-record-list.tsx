import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from "@tanstack/react-table";
import {
  useFinancialRecord,
  type FinancialRecord,
} from "../../contexts/financial-record-context";
import { useMemo } from "react";
import EditableCell from "./editable-cell";
import "./financial-record.css";


const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecord();

  const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
    const id = records[rowIndex]._id;
    updateRecord(id ?? "", {...records[rowIndex],[columnId]: value})
  }

  const columnHelper = createColumnHelper<FinancialRecord>();


const columns = useMemo(
  () => [
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => (
        <EditableCell
          cell={info.cell}
          updateRecord={updateCellRecord}
          editable
        />
      ),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => (
        <EditableCell
          cell={info.cell}
          updateRecord={updateCellRecord}
          editable
        />
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => (
        <EditableCell
          cell={info.cell}
          updateRecord={updateCellRecord}
          editable
        />
      ),
    }),
    columnHelper.accessor("paymentMethod", {
      header: "Payment Method",
      cell: (info) => (
        <EditableCell
          cell={info.cell}
          updateRecord={updateCellRecord}
          editable
        />
      ),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => (
        <EditableCell
          cell={info.cell}
          updateRecord={updateCellRecord}
          editable={false}
        />
      ),
    }),
    columnHelper.display({
      id: "delete",
      header: "Delete",
      cell: ({ row }) => (
        <button
        onClick={() => deleteRecord(row.original._id ?? " ")}
          className="button"
        >
          Delete
        </button>
      ),
    }),
  ],
  [records]
);

  const table = useReactTable({
    columns,
    data: records,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
     
     <div className="table-container">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
};

export default FinancialRecordList;
