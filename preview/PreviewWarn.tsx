import { FaExclamationTriangle } from 'react-icons/fa';
import { PreviewIndicator } from './PreviewIndicator';
import { usePreview } from './PreviewContext';
import { useIsLogged } from '../auth/useIsLogged';

export function PreviewWarn() {
  const { user } = usePreview();
  const { isLogged } = useIsLogged();

  if (!user) return null;

  return (
    <div className="fixed bottom-0 rounded-lg">
      <div className="bg-black text-white p-4 md:rounded-tr-2xl">
        <FaExclamationTriangle className="inline pb-1" size={20} />
        {' '}
        Para salvar os items marcados com
        {' '}
        <PreviewIndicator />
        ,
        {' '}
        <button
          onClick={isLogged}
          className="inline text-white border border-white"
        >
          clique aqui
        </button>
      </div>
    </div>
  );
}
