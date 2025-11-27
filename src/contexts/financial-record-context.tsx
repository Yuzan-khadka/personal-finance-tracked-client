import React, { createContext, useContext, useState } from "react";

interface FinancialRecord{
    id?: String,
     userId: String,
     date: Date,
     description: String,
     amount: number,
     category: String,
     paymentMethod: String,

}

interface FinancialRecordContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    // updateRecord: (id: String, newRecord: FinancialRecord) => void;
    // deleteRecord : (id: String) => void;
}

export const FinancialRecordContext = createContext<FinancialRecordContextType | undefined>(undefined);

export const FinancialRecordProvider = ({children} : {children: React.ReactNode}) => {

    const [records, setRecords] = useState<FinancialRecord[]>([]);

     const addRecord = async (record: FinancialRecord) => {

     try{
      const response = await fetch("http://localhost:3000/financial-records/addRecord",{
        method: 'POST',
          headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(record)
      });

       if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newRecord: FinancialRecord = await response.json();
    console.log(response);
    setRecords((prevRecord) => [...prevRecord, newRecord]);
    }catch(err){
      console.error('Error: Unable to add new record!!', err);
    }
  }

    return (<FinancialRecordContext.Provider value={{records, addRecord}}>
        {children}
    </FinancialRecordContext.Provider>)
    

    
}

export const useFinancialRecord = () => {
    const financialContext = useContext<FinancialRecordContextType | undefined>(FinancialRecordContext);
    

    if(!financialContext){
        throw new Error("useFinancialRecord must be used with in FinancialRecordProvider");
    }

    return financialContext;
}

