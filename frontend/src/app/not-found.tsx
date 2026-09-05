import Link from "next/link";

export const dynamic = 'force-dynamic';


export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center text-gray-700">
      <h1 className="text-7xl font-semibold text-gray-500">404</h1>
      <p className="my-8 text-xl">The page you are looking for could not be found.</p>
      <Link href="/" className="rounded-lg bg-gray-700 px-6 py-3 font-medium text-white hover:bg-gray-600">
        Go back home
      </Link>
    </main>
  );
}