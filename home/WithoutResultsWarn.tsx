import { Button } from '@mui/material';
import { useFilters } from '../search/FiltersContext';

export function WithoutResultsWarn() {
  const { filters, setFilters } = useFilters();
  const text = filters?.text;

  return (
    <div className="flex flex-col items-center max-w-sm">
      <div className="text-xl text-center">
        Nenhuma resultado encontrado
        {text ? ` para "${text}"` : ''}
      </div>
      <div className="text-center">
        {text
          ? 'Verifique a ortografia, altere os filtros ou tente usar um termo de pesquisa menos específico.'
          : 'Você pode tentar mudar os filtros de pesquisa.'}
      </div>
      <Button onClick={() => { setFilters({}); }}>Página inicial</Button>
    </div>
  );
}
