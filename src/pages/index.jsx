import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col container mx-auto">
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
    </div>
  );
}
