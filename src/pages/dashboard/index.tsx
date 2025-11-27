import { useUser } from "@clerk/clerk-react";
import FinancialRecordForm from "./financial-record-form";
import FinancialRecordList from "./financial-record-list";
import { Auth } from "../auth";

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();

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
    <div className="dashbaord-container">
      <h1>Welcome {user?.firstName}! Here are your Finances:</h1>
      <FinancialRecordForm />
      <FinancialRecordList />
    </div>
  );
};

export default Dashboard;
