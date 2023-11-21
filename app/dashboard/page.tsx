import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="authContainer">
      <h2>Welcome, ZeroIn Enthusiast!</h2>
      <section className="py-10">
        <div>Category</div>
        <div>Status</div>
        <div>Pantry</div>
      </section>

      <div>
        Already have an account?
        <Link href="/signup" className="text-green hover:font-bold">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
