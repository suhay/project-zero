"use client";
import { LoginContext } from "../../src/context/context";
import { useContext } from "react";
import DefaultDashboard from "@/src/components/Journey/DefaultDashboard";

// const Dashboard = ({ params }: { params: { category: string } }) => {
const Dashboard = () => {
  const { profileStatus } = useContext(LoginContext);
  console.log("in Dashboard page profileStatus", profileStatus);

  return (
    <div className="bg-secondary-300 ">
      {!profileStatus ? (
        // {!profileStatus && !params.category ? (
        <DefaultDashboard />
      ) : (
        <div>
          <div>profileStatus {profileStatus}</div>
          {/* <div>params.category {params.category}</div> */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
