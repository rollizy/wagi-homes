import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-brand-500 mb-4">404</h1>
      <p className="text-gray-400 mb-8">That property tour doesn't exist or has been removed.</p>
      <Link
        href="/"
        className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl
                   font-medium transition-colors"
      >
        Back to Listings
      </Link>
    </main>
  )
}
