import { HomePage } from './HomePage';
import { PlantItem } from '../common/PlantItem';
import { PlantsInput } from './input/PlantsInput';
import { plantsContext } from '../plant/plantsContext';

export function PlantsPage() {
  return (
    <HomePage
      tab="plants"
      context={plantsContext}
      topChildren={(
        <section className="max-w-xl">
          <PlantsInput />
        </section>
      )}
    >
      {(items) => (
        <div className="grid gap-2 grid-cols-2 md:grid-cols-5">
          {!!items && items.map((item) => (
            <PlantItem key={item.id} item={item} size={300} />
          ))}
        </div>
      )}
    </HomePage>
  );
}
