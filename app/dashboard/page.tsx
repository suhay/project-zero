"use client";
import { useRouter } from "next/navigation";
import { LoginContext } from "../../src/context/context";
import { useContext, useEffect } from "react";
import DefaultDashboard from "@/src/components/Journey/DefaultDashboard";

// const Dashboard = ({ params }: { params: { category: string } }) => {
const Dashboard = () => {
  const { profileStatus } = useContext(LoginContext);
  const router = useRouter();

  useEffect(() => {
    if (profileStatus) {
      router.push("/profile/");
    }
  }, [profileStatus, router]);

  return (
    <div className="bg-secondary-300">
      {!profileStatus ? <DefaultDashboard /> : null}
    </div>
  );
};

export default Dashboard;
