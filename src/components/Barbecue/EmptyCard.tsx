import { BarbecueIcon } from '@/customIcons/BarbecueIcon';

export const EmptyCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <button
        onClick={onClick}
        className='flex flex-col items-center justify-center w-[242px] h-[152px] p-4  bg-gray-100 rounded-sm shadow-sm'
      >
        <div className='w-[90px] h-[90px] flex items-center justify-center rounded-full bg-amber-300'>
          <BarbecueIcon />
        </div>
        <span className='text-sm font-bold text-black'>Adicionar Churras</span>
      </button>
    </div>
  );
};
