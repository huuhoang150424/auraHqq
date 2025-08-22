"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    skills: "",
    experienceYears: "",
    bio: "",
    avatar: null as File | null,
    socialLinks: "",
  });

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/member?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch members");
      }

      setMembers(data.members);
      setPagination({
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching members");
      toast.error(err.message || "An error occurred while fetching members");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [page]);

  const fetchMemberById = async (id: number) => {
    try {
      const response = await fetch(`/api/member/${id}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch member");
      }

      return data.member;
    } catch (err: any) {
      toast.error(err.message || "An error occurred while fetching member");
      return null;
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    if (formData.position) formDataToSend.append("position", formData.position);
    if (formData.experienceYears)
      formDataToSend.append("experienceYears", formData.experienceYears);
    if (formData.bio) formDataToSend.append("bio", formData.bio);
    if (formData.avatar) formDataToSend.append("avatar", formData.avatar);
    formDataToSend.append(
      "skills",
      JSON.stringify(formData.skills.split(",").map((s) => s.trim()))
    );
    formDataToSend.append(
      "socialLinks",
      JSON.stringify(
        formData.socialLinks
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s)
      )
    );

    try {
      formDataToSend.forEach((value, key) => {
        console.log(key, value);
      });

      const url = editingMember ? `/api/member/${editingMember.id}` : "/api/member";
      const method = editingMember ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || `Failed to ${editingMember ? "update" : "create"} member`);
      }

      toast.success(editingMember ? "Cập nhật thành viên thành công" : "Tạo thành viên thành công");
      await fetchMembers();
      resetForm();
    } catch (err: any) {
      setError(err.message || `An error occurred while ${editingMember ? "updating" : "creating"} member`);
      toast.error(err.message || `An error occurred while ${editingMember ? "updating" : "creating"} member`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      position: "",
      skills: "",
      experienceYears: "",
      bio: "",
      avatar: null,
      socialLinks: "",
    });
    setEditingMember(null);
    setAvatarPreview(null);
    setIsDialogOpen(false);
  };

  const handleEdit = async (member: any) => {
    const memberData = await fetchMemberById(member.id);
    if (memberData) {
      setEditingMember(memberData);
      setFormData({
        name: memberData.name,
        email: memberData.email,
        position: memberData.position || "",
        skills: memberData.skills.join(", "),
        experienceYears: memberData.experienceYears?.toString() || "",
        bio: memberData.bio || "",
        avatar: null,
        socialLinks: memberData.socialLinks.join(", "),
      });
      setAvatarPreview(memberData.avatarUrl || null);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/member/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to delete member");
      }

      toast.success("Xóa thành viên thành công");
      await fetchMembers();
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting member");
      toast.error(err.message || "An error occurred while deleting member");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, avatar: file || null });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(editingMember ? editingMember.avatarUrl : null);
    }
  };

  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
          {error}
        </div>
      )}
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
              <DialogTitle className="text-lg">
                {editingMember ? "Edit Member" : "Add New Member"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-gray-700 dark:text-gray-300 text-sm"
                  >
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 dark:text-gray-300 text-sm"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="position"
                    className="text-gray-700 dark:text-gray-300 text-sm"
                  >
                    Position
                  </Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="experienceYears"
                    className="text-gray-700 dark:text-gray-300 text-sm"
                  >
                    Experience (Years)
                  </Label>
                  <Input
                    id="experienceYears"
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceYears: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="skills"
                  className="text-gray-700 dark:text-gray-300 text-sm"
                >
                  Skills (comma separated)
                </Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  placeholder="React, TypeScript, Node.js"
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-gray-700 dark:text-gray-300 text-sm"
                >
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm min-h-[80px]"
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="avatar"
                  className="text-gray-700 dark:text-gray-300 text-sm"
                >
                  Avatar File
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                  disabled={isSubmitting}
                />
                {avatarPreview && (
                  <div className="mt-2">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="socialLinks"
                  className="text-gray-700 dark:text-gray-300 text-sm"
                >
                  Social Links (comma separated)
                </Label>
                <Input
                  id="socialLinks"
                  value={formData.socialLinks}
                  onChange={(e) =>
                    setFormData({ ...formData, socialLinks: e.target.value })
                  }
                  placeholder="https://github.com/username, https://linkedin.com/in/username"
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm h-9"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  size="sm"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editingMember ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>{editingMember ? "Update" : "Create"} Member</>
                  )}
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
          {isLoading ? (
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
                {Array(5).fill(0).map((_, index) => (
                  <SkeletonRow key={index} />
                ))}
              </TableBody>
            </Table>
          ) : (
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
                          <div className="font-medium text-sm">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {member.position || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 2).map((skill: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs px-2 py-0"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 2 && (
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0"
                          >
                            +{member.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {member.experienceYears
                        ? `${member.experienceYears} years`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(member)}
                          className="h-8 w-8 p-0"
                        >
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
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={page === 1 || isLoading}
          onClick={() => setPage(page - 1)}
          size="sm"
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {page} of {pagination.totalPages}
        </span>
        <Button
          disabled={page >= pagination.totalPages || isLoading}
          onClick={() => setPage(page + 1)}
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
