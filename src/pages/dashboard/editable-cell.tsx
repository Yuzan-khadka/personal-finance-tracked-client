import { useState } from "react";

interface EditableCellProps {
  cell: any;
  updateRecord: (rowIndex: number, columnId: string, value: any) => void;
  editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  cell,
  updateRecord,
  editable,
}) => {
  const initialValue = cell.getValue();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    setIsEditing(false);
    updateRecord(cell.row.index, cell.column.id, value);
  };
  
  return (
    <div
      onClick={() => editable && setIsEditing(true)}
      style={{ cursor: editable ? "pointer" : "default" }}
    >
      {isEditing ? (
        <input
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onBlur={onBlur}
          style={{ width: "100%" }}
        /> 
      ) : ( 
        value?.toString() ?? ""
      )}
    </div>
  );
};

export default EditableCell;
