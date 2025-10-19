import CoffeeCard from '@/components/shared/CoffeeCard';
import PageHeader from '@/components/shared/PageHeader';
import { coffees } from '@/lib/data';

export default function CoffeesPage() {
  return (
    <>
      <PageHeader
        title="Our Coffee Collection"
        description="From the vibrant hills of Ethiopia to the volcanic soils of Guatemala, each of our coffees tells a story. Explore our curated selection of single-origin beans, roasted to perfection."
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
