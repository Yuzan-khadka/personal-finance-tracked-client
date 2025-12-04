import { useUser } from "@clerk/clerk-react";
import FinancialRecordForm from "./financial-record-form";
import FinancialRecordList from "./financial-record-list";
import { Auth } from "../auth";
import { useFinancialRecord } from "../../contexts/financial-record-context";
import { useMemo } from "react";

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const  {records} = useFinancialRecord();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;

    records.forEach((record) => {
      totalAmount += record.amount;
    })

    return totalAmount;
  }, [records]);

  // Ensure Clerk is finished loading
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Ensure the user is signed in to access user data
  if (!isSignedIn) {
    return (
      <div>
        <h3>Please sign in to view this content.</h3>
        <Auth />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here are your Finances:</h1>
      <FinancialRecordForm />
      <div>Total Monthly Saving: {totalMonthly} </div>
      <FinancialRecordList />
    </div>
  );
};

export default Dashboard;
