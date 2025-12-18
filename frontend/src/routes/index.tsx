import { createFileRoute, Link } from '@tanstack/react-router'
import { MapPin, Building, ChevronRight, Search, Briefcase } from 'lucide-react'
import { useState, useMemo } from 'react'
import { fetchJobs, Job, MOCK_JOBS } from '../lib/api'

export const Route = createFileRoute('/')({
  loader: async () => {
    try {
      return await fetchJobs()
    } catch (error) {
      console.log('Loader error, returning mock data:', error)
      return MOCK_JOBS
    }
  },
  component: JobListPage,
})

function JobListPage() {
  const jobs = Route.useLoaderData() as Job[]
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const departments = useMemo(() => 
    [...new Set(jobs.map((job) => job.department))].sort() as string[],
    [jobs]
  )
  
  const jobTypes = useMemo(() => 
    [...new Set(jobs.map((job) => job.type))].sort() as string[],
    [jobs]
  )

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = !selectedDepartment || job.department === selectedDepartment
      const matchesType = !selectedType || job.type === selectedType

      return matchesSearch && matchesDepartment && matchesType
    })
  }, [jobs, searchTerm, selectedDepartment, selectedType])

  const formatJobType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800'
      case 'part-time': return 'bg-blue-100 text-blue-800'
      case 'contract': return 'bg-yellow-100 text-yellow-800'
      case 'internship': return 'bg-purple-100 text-purple-800'
      case 'remote': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Next Opportunity</h1>
          <p className="text-xl text-blue-100 mb-8">
            Join our team and help us build the future. We're looking for talented people across all departments.
          </p>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs by title, department, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>{formatJobType(type)}</option>
                  ))}
                </select>
              </div>

              {(selectedDepartment || selectedType || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedDepartment('')
                    setSelectedType('')
                    setSearchTerm('')
                  }}
                  className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Clear all filters
                </button>
              )}
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 mt-6 text-white">
              <Briefcase className="w-10 h-10 mb-4 text-blue-400" />
              <h3 className="font-semibold text-lg mb-2">Don't see a fit?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Submit a spontaneous application and we'll keep you in mind for future opportunities.
              </p>
              <Link
                to="/apply/$jobId"
                params={{ jobId: 'spontaneous' }}
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Apply Now
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'} Available
              </h2>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filters to find more opportunities.
                </p>
                <button
                  onClick={() => {
                    setSelectedDepartment('')
                    setSelectedType('')
                    setSearchTerm('')
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Link
                    key={job.id}
                    to="/jobs/$jobId"
                    params={{ jobId: job.id }}
                    className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                            {formatJobType(job.type)}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          {job.salary && (
                            <span className="text-green-600 font-medium">
                              {job.salary}
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-gray-600 line-clamp-2">
                          {job.description.split('\n')[0]}
                        </p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-4" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
