import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-navy-800 flex flex-col items-center justify-center text-center px-6">
      <p className="text-xs tracking-[0.3em] uppercase text-ochre-600 mb-4">Not Found</p>
      <h1
        className="text-7xl font-light text-ochre-500 mb-6"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        404
      </h1>
      <p className="text-sm mb-10" style={{ color: '#8888aa' }}>
        That property tour doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        className="border border-ochre-600 text-ochre-400 hover:bg-ochre-600 hover:text-navy-900
                   px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-200"
      >
        Back to Listings
      </Link>
    </main>
  )
}
