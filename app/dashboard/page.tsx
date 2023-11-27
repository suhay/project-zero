"use client";
import Link from "next/link";
import { profileData } from "../../src/context/context";
import { useContext } from "react";

// const Dashboard = ({ params }: { params: { category: string } }) => {
const Dashboard = () => {
  const { profileStatus } = useContext(profileData);
  console.log("in Dashboard page profileStatus", profileStatus);

  return (
    <div className="authContainer">
      {!profileStatus ? (
        // {!profileStatus && !params.category ? (

        <>
          <h2>Welcome, ZeroIn Enthusiast!</h2>
          <section className="py-10">
            <div>Category</div>
            <div>Status</div>
            <div>Pantry</div>
          </section>
        </>
      ) : (
        <div>
          <div>profileStatus {profileStatus}</div>
          {/* <div>params.category {params.category}</div> */}
        </div>
      )}
      <div className="my-52">
        Already have an account?
        <Link href="/signup" className="text-green-500 hover:font-bold ml-2">
          LogIn
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
