import { createFileRoute } from '@tanstack/react-router'
import { Download, Trash2, ExternalLink, Mail, Phone, Calendar } from 'lucide-react'
import { useState } from 'react'
import { fetchAdminApplications, updateApplicationStatus, deleteApplication, ApplicationWithJob, API_BASE_URL } from '../../lib/api'

export const Route = createFileRoute('/admin/applications')({
  loader: async () => {
    return fetchAdminApplications()
  },
  component: AdminApplications,
})

function AdminApplications() {
  const initialApplications = Route.useLoaderData() as ApplicationWithJob[]
  const [applications, setApplications] = useState<ApplicationWithJob[]>(initialApplications)
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [selectedApp, setSelectedApp] = useState<ApplicationWithJob | null>(null)

  const filteredApplications = applications.filter((item) => {
    const matchesType = !filterType || 
      (filterType === 'spontaneous' && item.application.isSpontaneous) ||
      (filterType === 'job' && !item.application.isSpontaneous)
    const matchesStatus = !filterStatus || item.application.status === filterStatus
    return matchesType && matchesStatus
  })

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateApplicationStatus(id, status)
      setApplications(prev => 
        prev.map(item => 
          item.application.id === id 
            ? { ...item, application: { ...item.application, status: status as any } }
            : item
        )
      )
      if (selectedApp?.application.id === id) {
        setSelectedApp(prev => prev ? { ...prev, application: { ...prev.application, status: status as any } } : null)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return
    
    try {
      await deleteApplication(id)
      setApplications(prev => prev.filter(item => item.application.id !== id))
      if (selectedApp?.application.id === id) {
        setSelectedApp(null)
      }
    } catch (error) {
      console.error('Error deleting application:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'shortlisted': return 'bg-purple-100 text-purple-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'hired': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        
        <div className="flex items-center gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="job">Job Applications</option>
            <option value="spontaneous">Spontaneous</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Applicant</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Position</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((item) => (
                  <tr 
                    key={item.application.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${selectedApp?.application.id === item.application.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedApp(item)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.application.firstName} {item.application.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{item.application.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.application.isSpontaneous ? (
                        <span className="text-purple-600 font-medium">Spontaneous</span>
                      ) : (
                        <span className="text-gray-600">{item.job?.title || 'Unknown'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(item.application.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={item.application.status}
                        onChange={(e) => {
                          e.stopPropagation()
                          handleStatusChange(item.application.id, e.target.value)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusBadge(item.application.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`${API_BASE_URL}${item.application.resumeUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Download Resume"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(item.application.id)
                          }}
                          className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No applications found.</p>
              </div>
            )}
          </div>
        </div>

        {selectedApp && (
          <div className="w-96 bg-white rounded-xl shadow-sm p-6 h-fit sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Application Details</h2>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedApp.application.firstName} {selectedApp.application.lastName}
                </h3>
                <p className={`text-sm ${getStatusBadge(selectedApp.application.status)} inline-block px-2 py-1 rounded-full mt-2 capitalize`}>
                  {selectedApp.application.status}
                </p>
              </div>

              <div className="space-y-2">
                <a
                  href={`mailto:${selectedApp.application.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Mail className="w-4 h-4" />
                  {selectedApp.application.email}
                </a>
                {selectedApp.application.phone && (
                  <a
                    href={`tel:${selectedApp.application.phone}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Phone className="w-4 h-4" />
                    {selectedApp.application.phone}
                  </a>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Applied {formatDate(selectedApp.application.createdAt)}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Applied for</p>
                <p className="font-medium text-gray-900">
                  {selectedApp.application.isSpontaneous ? 'Spontaneous Application' : selectedApp.job?.title}
                </p>
                {selectedApp.job && (
                  <p className="text-sm text-gray-500">{selectedApp.job.department}</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <a
                  href={`${API_BASE_URL}${selectedApp.application.resumeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
                {selectedApp.application.linkedinUrl && (
                  <a
                    href={selectedApp.application.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    LinkedIn Profile
                  </a>
                )}
                {selectedApp.application.portfolioUrl && (
                  <a
                    href={selectedApp.application.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Portfolio
                  </a>
                )}
              </div>

              {selectedApp.application.coverLetter && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Cover Letter</p>
                  <p className="text-gray-700 text-sm whitespace-pre-wrap">
                    {selectedApp.application.coverLetter}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm text-gray-500 mb-2">Update Status</label>
                <select
                  value={selectedApp.application.status}
                  onChange={(e) => handleStatusChange(selectedApp.application.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
