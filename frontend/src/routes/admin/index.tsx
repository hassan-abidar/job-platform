import { createFileRoute, Link } from '@tanstack/react-router'
import { Briefcase, Users, CheckCircle, Eye, UserPlus } from 'lucide-react'
import { fetchAdminStats } from '../../lib/api'

export const Route = createFileRoute('/admin/')({
  loader: async () => {
    return fetchAdminStats()
  },
  component: AdminDashboard,
})

function AdminDashboard() {
  const stats = Route.useLoaderData()

  const statCards = [
    { 
      icon: Briefcase, 
      label: 'Total Jobs', 
      value: stats.totalJobs, 
      color: 'bg-blue-500',
      subtext: `${stats.openJobs} open`
    },
    { 
      icon: Users, 
      label: 'Total Applications', 
      value: stats.totalApplications, 
      color: 'bg-green-500',
      subtext: `${stats.pendingApplications} pending`
    },
    { 
      icon: UserPlus, 
      label: 'Spontaneous', 
      value: stats.spontaneousApplications, 
      color: 'bg-purple-500',
      subtext: 'Applications'
    },
    { 
      icon: CheckCircle, 
      label: 'Hired', 
      value: stats.applicationsByStatus.hired, 
      color: 'bg-emerald-500',
      subtext: 'Candidates'
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-600">{stat.label}</p>
            <p className="text-sm text-gray-500">{stat.subtext}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h2>
          <div className="space-y-4">
            {Object.entries(stats.applicationsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                  <span className="text-gray-700 capitalize">{status}</span>
                </div>
                <span className="font-semibold text-gray-900">{count as number}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-700">Open</span>
              </div>
              <span className="font-semibold text-gray-900">{stats.openJobs}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-gray-700">Closed</span>
              </div>
              <span className="font-semibold text-gray-900">{stats.closedJobs}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-500" />
                <span className="text-gray-700">Draft</span>
              </div>
              <span className="font-semibold text-gray-900">{stats.draftJobs}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/jobs"
            search={{ action: 'new', editId: undefined }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            Create New Job
          </Link>
          <Link
            to="/admin/applications"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Applications
          </Link>
        </div>
      </div>
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case 'pending': return 'bg-yellow-500'
    case 'reviewed': return 'bg-blue-500'
    case 'shortlisted': return 'bg-purple-500'
    case 'rejected': return 'bg-red-500'
    case 'hired': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}
