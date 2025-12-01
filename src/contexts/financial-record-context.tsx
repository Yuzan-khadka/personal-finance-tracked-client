import { useUser } from "@clerk/clerk-react";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
  _id?: String;
  userId: String;
  date: Date;
  description: String;
  amount: number;
  category: String;
  paymentMethod: String;
}

interface FinancialRecordContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: String, newRecord: FinancialRecord) => void;
  deleteRecord : (id: String) => void;
}

export const FinancialRecordContext = createContext<
  FinancialRecordContextType | undefined
>(undefined);

export const FinancialRecordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {


  const [records, setRecords] = useState<FinancialRecord[]>([]);

   const { user } = useUser();

  const fetchRecords = async () => {
    
    if (!user) return;
    try {

      const response = await fetch(
        `http://localhost:3000/financial-records/getAllByUserID/${user?.id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setRecords(result);
    } catch (err) {
      console.error("Error: Unable to add new record!!", err);
    }
  };

   useEffect(() => {
    fetchRecords(); 
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    try {
      const response = await fetch(
        "http://localhost:3000/financial-records/addRecord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newRecord: FinancialRecord = await response.json();

      await fetchRecords();
      console.log(newRecord);

    //   setRecords((prev) => [...prev, newRecord]);
      
    } catch (err) {
      console.error("Error: Unable to add new record!!", err);
    }
  };


  const updateRecord = async (id: String, newRecord: FinancialRecord) => {

    try {
      const response = await fetch(
        `http://localhost:3000/financial-records/updateRecord/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecord),
        }
      );

      if (response.ok) {
       
      }

      const updatedRecord: FinancialRecord = await response.json();

    //   await fetchRecords();
      console.log(updatedRecord);

      setRecords((prev) => prev.map((record) => {
        if(record._id === id){
            return updatedRecord;
        }else{
            return record;
        }
      }));
      
    } catch (err) {
      console.error("Error: Unable to add new record!!", err);
    }
  };

  const deleteRecord = () => {};

 

  return (
    <FinancialRecordContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecord = () => {
  const financialContext = useContext<FinancialRecordContextType | undefined>(
    FinancialRecordContext
  );

  if (!financialContext) {
    throw new Error(
      "useFinancialRecord must be used with in FinancialRecordProvider"
    );
  }

  return financialContext;
};
