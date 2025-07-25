'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface ProjectSearchFilterProps {
  language: string;
  onSearch: (term: string) => void;
  onFilter: (category: string) => void;
  categories: string[];
  translations: any;
}

export function ProjectSearchFilter({
  language,
  onSearch,
  onFilter,
  categories,
  translations,
}: ProjectSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const t = translations;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    onFilter(category);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder={t.searchProjects}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="minecraft-input pl-10"
        />
      </div>
      <div className="flex items-center gap-2 ">
        <Filter className="w-4 h-4 text-gray-600" />
        <select
          value={selectedCategory}
          onChange={(e) => handleFilter(e.target.value)}
          className="minecraft-input px-4 py-2 border border-gray-200  "
        >
          <option  value="all">{t.allCategories}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
