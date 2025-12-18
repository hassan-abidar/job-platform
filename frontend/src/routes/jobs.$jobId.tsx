import { createFileRoute, Link } from '@tanstack/react-router'
import { MapPin, Building, Clock, ArrowLeft, CheckCircle, Gift } from 'lucide-react'
import { fetchJob, Job } from '../lib/api'

export const Route = createFileRoute('/jobs/$jobId')({
  loader: async ({ params }) => {
    return fetchJob(params.jobId)
  },
  component: JobDetailPage,
})

function JobDetailPage() {
  const job = Route.useLoaderData() as Job

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
                  {formatJobType(job.type)}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  {job.department}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Posted {formatDate(job.createdAt)}
                </span>
              </div>
            </div>

            <Link
              to="/apply/$jobId"
              params={{ jobId: job.id }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Apply Now
            </Link>
          </div>

          {job.salary && (
            <div className="flex items-center gap-2 text-lg text-green-600 font-semibold">
              {job.salary}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About this role</h2>
          <div className="prose prose-gray max-w-none">
            {job.description.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {job.requirements && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              Requirements
            </h2>
            <div className="space-y-2">
              {job.requirements.split('\n').map((req: string, index: number) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {req}
                </p>
              ))}
            </div>
          </div>
        )}

        {job.benefits && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Gift className="w-6 h-6 text-green-600" />
              What we offer
            </h2>
            <div className="space-y-2">
              {job.benefits.split('\n').map((benefit: string, index: number) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {benefit}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to join our team?</h2>
          <p className="text-blue-100 mb-6">
            Take the next step in your career and apply for this position today.
          </p>
          <Link
            to="/apply/$jobId"
            params={{ jobId: job.id }}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Apply for this Position
          </Link>
        </div>
      </div>
    </div>
  )
}
