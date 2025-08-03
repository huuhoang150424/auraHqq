"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Search, ExternalLink, Eye, EyeOff } from "lucide-react"

// Mock data based on Project model
const mockProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with modern UI and secure payment integration.",
    imageUrls: ["/placeholder.svg?height=200&width=300"],
    demoLink: "https://demo.example.com",
    sourceLinks: ["https://github.com/team/ecommerce"],
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    duration: 3,
    category: "Web Development",
    memberCount: 4,
    keyFeatures: ["Payment Integration", "Admin Dashboard", "Mobile Responsive"],
    isHidden: false,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    imageUrls: ["/placeholder.svg?height=200&width=300"],
    demoLink: "https://tasks.example.com",
    sourceLinks: ["https://github.com/team/taskapp"],
    technologies: ["Vue.js", "Express", "MongoDB", "Socket.io"],
    duration: 2,
    category: "Productivity",
    memberCount: 3,
    keyFeatures: ["Real-time Collaboration", "File Attachments", "Team Management"],
    isHidden: false,
    createdAt: "2024-01-10",
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrls: "",
    demoLink: "",
    sourceLinks: "",
    technologies: "",
    duration: "",
    category: "",
    memberCount: "",
    keyFeatures: "",
    isHidden: false,
  })

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const projectData = {
      ...formData,
      imageUrls: formData.imageUrls
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      sourceLinks: formData.sourceLinks
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      technologies: formData.technologies.split(",").map((s) => s.trim()),
      keyFeatures: formData.keyFeatures.split(",").map((s) => s.trim()),
      duration: Number.isNaN(Number.parseInt(formData.duration)) ? 0 : Number.parseInt(formData.duration),
      memberCount: Number.isNaN(Number.parseInt(formData.memberCount)) ? 0 : Number.parseInt(formData.memberCount),
      id: editingProject ? editingProject.id : Date.now(),
      createdAt: editingProject ? editingProject.createdAt : new Date().toISOString().split("T")[0],
    }

    if (editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? projectData : p)))
    } else {
      setProjects([...projects, projectData])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrls: "",
      demoLink: "",
      sourceLinks: "",
      technologies: "",
      duration: "",
      category: "",
      memberCount: "",
      keyFeatures: "",
      isHidden: false,
    })
    setEditingProject(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (project: any) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      imageUrls: project.imageUrls.join(", "),
      demoLink: project.demoLink || "",
      sourceLinks: project.sourceLinks.join(", "),
      technologies: project.technologies.join(", "),
      duration: project.duration?.toString() || "",
      category: project.category || "",
      memberCount: project.memberCount?.toString() || "",
      keyFeatures: project.keyFeatures.join(", "),
      isHidden: project.isHidden,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const toggleVisibility = (id: number) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, isHidden: !p.isHidden } : p)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Manage your team's projects and showcase work</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-lg">{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm text-gray-700 dark:text-gray-300">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm text-gray-700 dark:text-gray-300">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm text-gray-700 dark:text-gray-300">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="text-sm min-h-[80px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm text-gray-700 dark:text-gray-300">
                    Duration (months)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberCount" className="text-sm text-gray-700 dark:text-gray-300">
                    Team Size
                  </Label>
                  <Input
                    id="memberCount"
                    type="number"
                    value={formData.memberCount}
                    onChange={(e) => setFormData({ ...formData, memberCount: e.target.value })}
                    className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologies" className="text-sm text-gray-700 dark:text-gray-300">
                  Technologies (comma separated)
                </Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, PostgreSQL"
                  className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyFeatures" className="text-sm text-gray-700 dark:text-gray-300">
                  Key Features (comma separated)
                </Label>
                <Input
                  id="keyFeatures"
                  value={formData.keyFeatures}
                  onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                  placeholder="Authentication, Real-time Updates, Mobile Responsive"
                  className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demoLink" className="text-sm text-gray-700 dark:text-gray-300">
                  Demo Link
                </Label>
                <Input
                  id="demoLink"
                  value={formData.demoLink}
                  onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                  placeholder="https://demo.example.com"
                  className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sourceLinks" className="text-sm text-gray-700 dark:text-gray-300">
                  Source Links (comma separated)
                </Label>
                <Input
                  id="sourceLinks"
                  value={formData.sourceLinks}
                  onChange={(e) => setFormData({ ...formData, sourceLinks: e.target.value })}
                  placeholder="https://github.com/team/project"
                  className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrls" className="text-sm text-gray-700 dark:text-gray-300">
                  Image URLs (comma separated)
                </Label>
                <Input
                  id="imageUrls"
                  value={formData.imageUrls}
                  onChange={(e) => setFormData({ ...formData, imageUrls: e.target.value })}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isHidden"
                  checked={formData.isHidden}
                  onCheckedChange={(checked) => setFormData({ ...formData, isHidden: checked })}
                />
                <Label htmlFor="isHidden" className="text-sm text-gray-700 dark:text-gray-300">
                  Hide from public view
                </Label>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm} size="sm">
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  {editingProject ? "Update" : "Create"} Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 bg-white dark:bg-gray-800">
          <Table className="bg-white dark:bg-gray-800">
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm">Project</TableHead>
                <TableHead className="text-sm">Category</TableHead>
                <TableHead className="text-sm">Technologies</TableHead>
                <TableHead className="text-sm">Team</TableHead>
                <TableHead className="text-sm">Status</TableHead>
                <TableHead className="text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={project.imageUrls[0] || "/placeholder.svg?height=40&width=40"}
                        alt={project.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm">{project.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {project.description}
                        </div>
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center mt-1"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{project.category || "—"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 2 && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          +{project.technologies.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {project.memberCount ? `${project.memberCount} members` : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant={project.isHidden ? "secondary" : "default"} className="text-xs">
                        {project.isHidden ? "Hidden" : "Public"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleVisibility(project.id)}
                        className="h-6 w-6 p-0"
                      >
                        {project.isHidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(project)} className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
