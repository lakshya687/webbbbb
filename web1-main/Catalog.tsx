import { Navigation } from '@/components/Navigation';
import { ToolCard } from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORIES, TOOLS } from '@shared/tools';
import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation } from 'wouter';

export default function Catalog() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="border-b border-border py-12">
        <div className="container">
          <h1 className="mb-4">Tool Catalog</h1>
          <p className="text-lg text-muted-foreground">
            Browse all {TOOLS.length} tools across {CATEGORIES.length} categories
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b border-border py-8 sticky top-16 bg-background/95 backdrop-blur-sm z-40">
        <div className="container">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {CATEGORIES.map(category => (
              <Button
                key={category.slug}
                variant={selectedCategory === category.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <div className="container">
          {filteredTools.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                No tools found matching your search
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, idx) => (
                  <div
                    key={tool.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${(idx % 6) * 30}ms` }}
                  >
                    <ToolCard tool={tool} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
