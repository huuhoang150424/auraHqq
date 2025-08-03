"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Search, Mail } from "lucide-react"
const mockMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    position: "Frontend Developer",
    skills: ["React", "TypeScript", "Next.js"],
    experienceYears: 3,
    bio: "Passionate frontend developer with expertise in modern web technologies.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    socialLinks: ["https://github.com/johndoe", "https://linkedin.com/in/johndoe"],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    position: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    experienceYears: 4,
    bio: "Creative designer focused on user-centered design solutions.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    socialLinks: ["https://dribbble.com/janesmith"],
    createdAt: "2024-01-10",
  },
]

export default function MembersPage() {
  const [members, setMembers] = useState(mockMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    skills: "",
    experienceYears: "",
    bio: "",
    avatarUrl: "",
    socialLinks: "",
  })

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const memberData = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
      socialLinks: formData.socialLinks
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      experienceYears: Number.parseInt(formData.experienceYears) || 0,
      id: editingMember ? editingMember.id : Date.now(),
      createdAt: editingMember ? editingMember.createdAt : new Date().toISOString().split("T")[0],
    }

    if (editingMember) {
      setMembers(members.map((m) => (m.id === editingMember.id ? memberData : m)))
    } else {
      setMembers([...members, memberData])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      position: "",
      skills: "",
      experienceYears: "",
      bio: "",
      avatarUrl: "",
      socialLinks: "",
    })
    setEditingMember(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (member: any) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      position: member.position || "",
      skills: member.skills.join(", "),
      experienceYears: member.experienceYears?.toString() || "",
      bio: member.bio || "",
      avatarUrl: member.avatarUrl || "",
      socialLinks: member.socialLinks.join(", "),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setMembers(members.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Team Members</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Manage your team members and their information
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-lg">{editingMember ? "Edit Member" : "Add New Member"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 text-sm">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-sm">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-gray-700 dark:text-gray-300 text-sm">
                    Position
                  </Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceYears" className="text-gray-700 dark:text-gray-300 text-sm">
                    Experience (Years)
                  </Label>
                  <Input
                    id="experienceYears"
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-gray-700 dark:text-gray-300 text-sm">
                  Skills (comma separated)
                </Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, TypeScript, Node.js"
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300 text-sm">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm min-h-[80px]"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatarUrl" className="text-gray-700 dark:text-gray-300 text-sm">
                  Avatar URL
                </Label>
                <Input
                  id="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialLinks" className="text-gray-700 dark:text-gray-300 text-sm">
                  Social Links (comma separated)
                </Label>
                <Input
                  id="socialLinks"
                  value={formData.socialLinks}
                  onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
                  placeholder="https://github.com/username, https://linkedin.com/in/username"
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm} size="sm">
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  {editingMember ? "Update" : "Create"} Member
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
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 pl-10 text-sm h-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 bg-white dark:bg-gray-800">
          <Table className="bg-white dark:bg-gray-800">
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm">Member</TableHead>
                <TableHead className="text-sm">Position</TableHead>
                <TableHead className="text-sm">Skills</TableHead>
                <TableHead className="text-sm">Experience</TableHead>
                <TableHead className="text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatarUrl || "/placeholder.svg"}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{member.position || "—"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                          {skill}
                        </Badge>
                      ))}
                      {member.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          +{member.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {member.experienceYears ? `${member.experienceYears} years` : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(member)} className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(member.id)}
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
