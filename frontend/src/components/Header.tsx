import { Link } from '@tanstack/react-router'
import { Briefcase, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <Briefcase className="w-8 h-8" />
            <span className="text-xl font-bold">MarkoubJobs</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              activeProps={{ className: 'text-blue-600' }}
            >
              Jobs
            </Link>
            <Link
              to="/apply/$jobId"
              params={{ jobId: 'spontaneous' }}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              activeProps={{ className: 'text-blue-600' }}
            >
              Spontaneous Application
            </Link>
            <Link
              to="/admin"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Admin
            </Link>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col p-4 gap-3">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Offres
            </Link>
            <Link
              to="/apply/$jobId"
              params={{ jobId: 'spontaneous' }}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Candidature Spontanee
            </Link>
            <Link
              to="/admin"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
