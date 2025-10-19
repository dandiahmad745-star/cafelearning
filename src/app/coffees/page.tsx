import CoffeeCard from '@/components/shared/CoffeeCard';
import PageHeader from '@/components/shared/PageHeader';
import { coffees } from '@/lib/data';

export default function CoffeesPage() {
  return (
    <>
      <PageHeader
        title="Single-Origin Selections"
        description="Explore the unique characteristics, flavor profiles, and stories behind beans from world-renowned coffee-growing regions. Every bean tells a story."
      />
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </div>
    </>
  );
}
