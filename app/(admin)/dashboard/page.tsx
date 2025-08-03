import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FolderOpen, Briefcase, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Members",
      value: "12",
      icon: Users,
      change: "+2 this month",
      changeType: "positive" as const,
    },
    {
      title: "Active Projects",
      value: "8",
      icon: FolderOpen,
      change: "+1 this week",
      changeType: "positive" as const,
    },
    {
      title: "Services",
      value: "5",
      icon: Briefcase,
      change: "No change",
      changeType: "neutral" as const,
    },
    {
      title: "Growth",
      value: "23%",
      icon: TrendingUp,
      change: "+5% from last month",
      changeType: "positive" as const,
    },
  ] as Array<{
    title: string;
    value: string;
    icon: React.ElementType;
    change: string;
    changeType: "positive" | "neutral" | "negative";
  }>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
              <p
                className={`text-xs mt-1 ${
                  stat.changeType === "positive"
                    ? "text-green-600 dark:text-green-400"
                    : stat.changeType === "negative"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">New member John Doe added</span>
              <span className="text-gray-400 dark:text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">Project "E-commerce App" updated</span>
              <span className="text-gray-400 dark:text-gray-500 ml-auto">5 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">New service "Web Development" created</span>
              <span className="text-gray-400 dark:text-gray-500 ml-auto">1 day ago</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full text-left p-3 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
              <div className="font-medium text-gray-900 dark:text-gray-100">Add New Member</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">Create a new team member profile</div>
            </button>
            <button className="w-full text-left p-3 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
              <div className="font-medium text-gray-900 dark:text-gray-100">Create Project</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">Add a new project to showcase</div>
            </button>
            <button className="w-full text-left p-3 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
              <div className="font-medium text-gray-900 dark:text-gray-100">Manage Services</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">Update service offerings</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
