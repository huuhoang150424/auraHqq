"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, ExternalLink, Eye, EyeOff, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [removedImageUrls, setRemovedImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [] as File[],
    demoLink: "",
    sourceLinks: "",
    technologies: "",
    duration: "",
    category: "",
    memberCount: "",
    keyFeatures: "",
    isHidden: false,
  });

  const getProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/project?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch projects");
      }

      setProjects(data.projects);
      setPagination(data.pagination);
      setError(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching projects");
      toast.error(err.message || "An error occurred while fetching projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, [page, searchTerm]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length + formData.images.length + (imagePreviews.length - removedImageUrls.length) > 5) {
      toast.error("Tối đa 5 ảnh được phép upload");
      return;
    }

    setFormData({ ...formData, images: [...formData.images, ...files] });
    console.log(`Selected ${files.length} images:`, files.map((f) => f.name));

    const previews = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews).then((newUrls) => {
      setImagePreviews([...imagePreviews, ...newUrls]);
    });
  };

  const handleRemoveImage = (index: number) => {
    const previewToRemove = imagePreviews[index];
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));

    const isNewImage = index >= (editingProject?.imageUrls?.length || 0);
    if (isNewImage) {
      const newImageIndex = index - (editingProject?.imageUrls?.length || 0);
      setFormData({
        ...formData,
        images: formData.images.filter((_, i) => i !== newImageIndex),
      });
    } else {
      setRemovedImageUrls([...removedImageUrls, previewToRemove]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.demoLink) formDataToSend.append("demoLink", formData.demoLink);
    if (formData.sourceLinks)
      formDataToSend.append(
        "sourceLinks",
        JSON.stringify(formData.sourceLinks.split(",").map((s) => s.trim()).filter((s) => s))
      );
    if (formData.technologies)
      formDataToSend.append(
        "technologies",
        JSON.stringify(formData.technologies.split(",").map((s) => s.trim()))
      );
    if (formData.duration) formDataToSend.append("duration", formData.duration);
    if (formData.category) formDataToSend.append("category", formData.category);
    if (formData.memberCount) formDataToSend.append("memberCount", formData.memberCount);
    if (formData.keyFeatures)
      formDataToSend.append(
        "keyFeatures",
        JSON.stringify(formData.keyFeatures.split(",").map((s) => s.trim()))
      );
    formDataToSend.append("isHidden", formData.isHidden.toString());

    // Append new images to FormData
    formData.images.forEach((image, index) => {
      formDataToSend.append("images", image);
      console.log(`Appending image ${index + 1}: ${image.name}`);
    });

    if (editingProject) {
      formDataToSend.append("removedImageUrls", JSON.stringify(removedImageUrls));
    }

    try {
      const response = await fetch(
        editingProject ? `/api/project/${editingProject.id}` : "/api/project",
        {
          method: editingProject ? "PUT" : "POST",
          body: formDataToSend,
        }
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to save project");
      }

      toast.success(editingProject ? "Project updated successfully" : "Project created successfully");
      await getProjects();
      resetForm();
    } catch (err: any) {
      setError(err.message || "An error occurred while saving project");
      toast.error(err.message || "An error occurred while saving project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      images: [],
      demoLink: "",
      sourceLinks: "",
      technologies: "",
      duration: "",
      category: "",
      memberCount: "",
      keyFeatures: "",
      isHidden: false,
    });
    setEditingProject(null);
    setImagePreviews([]);
    setRemovedImageUrls([]);
    setIsDialogOpen(false);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      images: [],
      demoLink: project.demoLink || "",
      sourceLinks: project.sourceLinks.join(", "),
      technologies: project.technologies.join(", "),
      duration: project.duration?.toString() || "",
      category: project.category || "",
      memberCount: project.memberCount?.toString() || "",
      keyFeatures: project.keyFeatures.join(", "),
      isHidden: project.isHidden,
    });
    setImagePreviews(project.imageUrls || []);
    setRemovedImageUrls([]);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    setDeletingProjectId(id);
    try {
      const response = await fetch(`/api/project/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to delete project");
      }

      toast.success("Project deleted successfully");
      await getProjects();
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting project");
      toast.error(err.message || "An error occurred while deleting project");
    } finally {
      setDeletingProjectId(null);
    }
  };

  const toggleVisibility = async (id: number) => {
    try {
      const project = projects.find((p) => p.id === id);
      if (!project) {
        throw new Error("Project not found");
      }

      const response = await fetch(`/api/project/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isHidden: !project.isHidden }),
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to update visibility");
      }

      toast.success(`Project set to ${data.project.isHidden ? "hidden" : "public"}`);
      await getProjects();
    } catch (err: any) {
      setError(err.message || "An error occurred while updating visibility");
      toast.error(err.message || "An error occurred while updating visibility");
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Manage your team's projects and showcase work
          </p>
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
              <DialogTitle className="text-lg">
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images" className="text-sm text-gray-700 dark:text-gray-300">
                  Project Images (multiple, max 5)
                </Label>
                <div className="relative">
                  <label
                    htmlFor="images"
                    className="flex items-center justify-center h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Upload className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Upload images (max 5)</span>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                  </label>
                </div>
                {imagePreviews.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-4 border border-gray-300 dark:border-gray-600 p-2 rounded-lg">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={isSubmitting}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isHidden"
                  checked={formData.isHidden}
                  onCheckedChange={(checked) => setFormData({ ...formData, isHidden: checked })}
                  disabled={isSubmitting}
                />
                <Label htmlFor="isHidden" className="text-sm text-gray-700 dark:text-gray-300">
                  Hide from public view
                </Label>
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
                      {editingProject ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>{editingProject ? "Update Project" : "Create Project"}</>
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
              {isLoading ? (
                // Skeleton loader
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                          <div className="h-3 w-60 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          {project.imageUrls.slice(0, 2).map((url: string, index: number) => (
                            <img
                              key={index}
                              src={url || "/placeholder.svg?height=40&width=40"}
                              alt={`${project.title} image ${index + 1}`}
                              className="w-10 h-10 rounded object-cover"
                            />
                          ))}
                          {project.imageUrls.length > 2 && (
                            <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 opacity-50 flex items-center justify-center text-xs font-medium">
                              +{project.imageUrls.length - 2}
                            </div>
                          )}
                        </div>
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
                        {project.technologies.slice(0, 2).map((tech: string, index: number) => (
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
                          disabled={deletingProjectId === project.id}
                        >
                          {project.isHidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(project)}
                          className="h-8 w-8 p-0"
                          disabled={deletingProjectId === project.id}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(project.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          disabled={deletingProjectId === project.id}
                        >
                          {deletingProjectId === project.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={page === 1 || isSubmitting || isLoading}
          onClick={() => setPage(page - 1)}
          size="sm"
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {page} of {pagination.totalPages}
        </span>
        <Button
          disabled={page >= pagination.totalPages || isSubmitting || isLoading}
          onClick={() => setPage(page + 1)}
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
