"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Search, DollarSign } from "lucide-react"

// Mock data based on Service model
const mockServices = [
  {
    id: 1,
    name: "Web Development",
    imageUrl: "/placeholder.svg?height=60&width=60",
    features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "Cross-browser Compatibility"],
    price: 2500,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Mobile App Development",
    imageUrl: "/placeholder.svg?height=60&width=60",
    features: ["iOS & Android", "React Native", "Push Notifications", "App Store Deployment"],
    price: 4000,
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "UI/UX Design",
    imageUrl: "/placeholder.svg?height=60&width=60",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    price: 1800,
    createdAt: "2024-01-08",
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState(mockServices)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    features: "",
    price: "",
  })

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const serviceData = {
      ...formData,
      features: formData.features.split(",").map((s) => s.trim()),
      price: Number.isNaN(Number.parseInt(formData.price)) ? 0 : Number.parseInt(formData.price),
      id: editingService ? editingService.id : Date.now(),
      createdAt: editingService ? editingService.createdAt : new Date().toISOString().split("T")[0],
    }

    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? serviceData : s)))
    } else {
      setServices([...services, serviceData])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      imageUrl: "",
      features: "",
      price: "",
    })
    setEditingService(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (service: any) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      imageUrl: service.imageUrl || "",
      features: service.features.join(", "),
      price: service.price?.toString() || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Manage your team's service offerings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-lg">{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-300">
                    Service Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm text-gray-700 dark:text-gray-300">
                    Price (USD)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    placeholder="2500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-sm text-gray-700 dark:text-gray-300">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  placeholder="https://example.com/service-image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features" className="text-sm text-gray-700 dark:text-gray-300">
                  Features (comma separated) *
                </Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Responsive Design, SEO Optimization, Performance Optimization"
                  className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm} size="sm">
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  {editingService ? "Update" : "Create"} Service
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="relative bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={service.imageUrl || "/placeholder.svg?height=48&width=48"}
                  alt={service.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  {service.price && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <DollarSign className="h-4 w-4 mr-1" />${service.price.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(service)} className="h-8 px-3">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                    className="h-8 px-3 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">All Services</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search services..."
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
                <TableHead className="text-sm">Service</TableHead>
                <TableHead className="text-sm">Features</TableHead>
                <TableHead className="text-sm">Price</TableHead>
                <TableHead className="text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={service.imageUrl || "/placeholder.svg?height=32&width=32"}
                        alt={service.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="font-medium text-sm">{service.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                          {feature}
                        </Badge>
                      ))}
                      {service.features.length > 2 && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          +{service.features.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {service.price ? `$${service.price.toLocaleString()}` : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(service)} className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(service.id)}
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
