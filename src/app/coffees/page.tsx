'use client';

import { useState, useMemo } from 'react';
import CoffeeCard from '@/components/shared/CoffeeCard';
import PageHeader from '@/components/shared/PageHeader';
import { coffees } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Coffee } from '@/lib/types';
import { Search } from 'lucide-react';

const COFFEES_PER_PAGE = 5;

const CoffeeFilters = ({
  searchQuery,
  setSearchQuery,
  roastFilter,
  setRoastFilter,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roastFilter: string;
  setRoastFilter: (roast: string) => void;
}) => {
  const roastTypes = ['All', 'Light', 'Medium', 'Dark'];

  return (
    <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a coffee..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <span className="text-muted-foreground whitespace-nowrap">Filter by roast:</span>
        <Select value={roastFilter} onValueChange={setRoastFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select Roast" />
          </SelectTrigger>
          <SelectContent>
            {roastTypes.map((roast) => (
              <SelectItem key={roast} value={roast}>
                {roast}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};


export default function CoffeesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roastFilter, setRoastFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCoffees = useMemo(() => {
    return coffees.filter((coffee) => {
      const matchesSearch = coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            coffee.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            coffee.flavorProfile.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesRoast = roastFilter === 'All' || coffee.roast === roastFilter;
      return matchesSearch && matchesRoast;
    });
  }, [searchQuery, roastFilter]);

  const totalPages = Math.ceil(filteredCoffees.length / COFFEES_PER_PAGE);
  const paginatedCoffees = filteredCoffees.slice(
    (currentPage - 1) * COFFEES_PER_PAGE,
    currentPage * COFFEES_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  // Reset to page 1 when filters change
  useState(() => {
    setCurrentPage(1);
  });

  return (
    <>
      <PageHeader
        title="Single-Origin Selections"
        description="Explore the unique characteristics, flavor profiles, and stories behind beans from world-renowned coffee-growing regions. Every bean tells a story."
      />
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        
        <CoffeeFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roastFilter={roastFilter}
          setRoastFilter={setRoastFilter}
        />

        {paginatedCoffees.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {paginatedCoffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        ) : (
            <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-2">No Coffees Found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
        )}

        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
                </span>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
                </Button>
            </div>
        )}
      </div>
    </>
  );
}
