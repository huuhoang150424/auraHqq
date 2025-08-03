"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, Trash2, Plus } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Team Portfolio",
    siteDescription: "We are a creative team building amazing digital experiences",
    contactEmail: "contact@teamportfolio.com",
    socialLinks: {
      github: "https://github.com/team",
      linkedin: "https://linkedin.com/company/team",
      twitter: "https://twitter.com/team",
    },
    seoSettings: {
      metaTitle: "Team Portfolio - Creative Digital Solutions",
      metaDescription: "Professional team offering web development, mobile apps, and UI/UX design services",
      keywords: "web development, mobile apps, UI/UX design, team portfolio",
    },
    displaySettings: {
      showMemberCount: true,
      showProjectStats: true,
      enableDarkMode: false,
      showContactForm: true,
    },
  })

  const [newKeyword, setNewKeyword] = useState("")
  const keywords = settings.seoSettings.keywords.split(", ").filter((k) => k.trim())

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Settings saved:", settings)
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      const updatedKeywords = [...keywords, newKeyword.trim()].join(", ")
      setSettings({
        ...settings,
        seoSettings: {
          ...settings.seoSettings,
          keywords: updatedKeywords,
        },
      })
      setNewKeyword("")
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    const updatedKeywords = keywords.filter((k) => k !== keywordToRemove).join(", ")
    setSettings({
      ...settings,
      seoSettings: {
        ...settings.seoSettings,
        keywords: updatedKeywords,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Manage your portfolio settings and configuration
          </p>
        </div>
        <Button onClick={handleSave} size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">General Settings</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Basic information about your team and portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-sm text-gray-700 dark:text-gray-300">
                Site Name
              </Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    siteName: e.target.value,
                  })
                }
                className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription" className="text-sm text-gray-700 dark:text-gray-300">
                Site Description
              </Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    siteDescription: e.target.value,
                  })
                }
                className="text-sm min-h-[80px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-sm text-gray-700 dark:text-gray-300">
                Contact Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contactEmail: e.target.value,
                  })
                }
                className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Social Links</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Configure your team's social media presence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github" className="text-sm text-gray-700 dark:text-gray-300">
                GitHub
              </Label>
              <Input
                id="github"
                value={settings.socialLinks.github}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: {
                      ...settings.socialLinks,
                      github: e.target.value,
                    },
                  })
                }
                className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                placeholder="https://github.com/team"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm text-gray-700 dark:text-gray-300">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={settings.socialLinks.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: {
                      ...settings.socialLinks,
                      linkedin: e.target.value,
                    },
                  })
                }
                className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                placeholder="https://linkedin.com/company/team"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-sm text-gray-700 dark:text-gray-300">
                Twitter
              </Label>
              <Input
                id="twitter"
                value={settings.socialLinks.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: {
                      ...settings.socialLinks,
                      twitter: e.target.value,
                    },
                  })
                }
                className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                placeholder="https://twitter.com/team"
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">SEO Settings</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Optimize your portfolio for search engines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle" className="text-sm text-gray-700 dark:text-gray-300">
                Meta Title
              </Label>
              <Input
                id="metaTitle"
                value={settings.seoSettings.metaTitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seoSettings: {
                      ...settings.seoSettings,
                      metaTitle: e.target.value,
                    },
                  })
                }
                className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription" className="text-sm text-gray-700 dark:text-gray-300">
                Meta Description
              </Label>
              <Textarea
                id="metaDescription"
                value={settings.seoSettings.metaDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seoSettings: {
                      ...settings.seoSettings,
                      metaDescription: e.target.value,
                    },
                  })
                }
                className="text-sm min-h-[80px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-700 dark:text-gray-300">Keywords</Label>
              <div className="flex gap-2">
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add keyword"
                  className="text-sm h-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                />
                <Button type="button" onClick={addKeyword} size="sm" className="h-9">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                    {keyword}
                    <button onClick={() => removeKeyword(keyword)} className="ml-2 text-gray-500 hover:text-red-600">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Display Settings</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Control what information is shown on your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Member Count</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Display team size on landing page</p>
              </div>
              <Switch
                checked={settings.displaySettings.showMemberCount}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    displaySettings: {
                      ...settings.displaySettings,
                      showMemberCount: checked,
                    },
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Project Stats</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Display project statistics</p>
              </div>
              <Switch
                checked={settings.displaySettings.showProjectStats}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    displaySettings: {
                      ...settings.displaySettings,
                      showProjectStats: checked,
                    },
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Dark Mode</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Allow users to switch themes</p>
              </div>
              <Switch
                checked={settings.displaySettings.enableDarkMode}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    displaySettings: {
                      ...settings.displaySettings,
                      enableDarkMode: checked,
                    },
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Contact Form</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Display contact form on landing page</p>
              </div>
              <Switch
                checked={settings.displaySettings.showContactForm}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    displaySettings: {
                      ...settings.displaySettings,
                      showContactForm: checked,
                    },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup & Export */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg">Backup & Export</CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Manage your data and create backups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
