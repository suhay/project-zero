"use client";
import DefaultDashboard from "@/src/components/Journey/DefaultDashboard";
import { useUserData } from "@/src/hooks/useUserData";

const Dashboard = () => {
  const { userProfile } = useUserData({ successPath: "/profile" });

  return (
    <div className="bg-secondary-300">
      {!userProfile ? <DefaultDashboard /> : null}
    </div>
  );
};

export default Dashboard;
