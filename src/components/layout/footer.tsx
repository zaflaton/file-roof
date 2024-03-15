import Link from 'next/link'

export function Footer() {
  return (
    <div className="mt-24 flex h-24 items-center bg-neutral-100">
      <div className="container mx-auto flex items-center justify-between">
        <div>FileDrive</div>

        <Link className="text-blue-900 hover:text-blue-500" href="/privacy">
          Privacy Policy
        </Link>
        <Link
          className="text-blue-900 hover:text-blue-500"
          href="/terms-of-service">
          Terms of Service
        </Link>
        <Link className="text-blue-900 hover:text-blue-500" href="/about">
          About
        </Link>
      </div>
    </div>
  )
}
