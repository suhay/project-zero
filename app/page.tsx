import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Home</h1>
        <nav>
          <Link href="/signup">Sign up</Link>
          <br />
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </main>
  );
}
