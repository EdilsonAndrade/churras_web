import { useRouter } from 'next/router';
import { LogOut } from 'react-feather';

export const Header = () => {
  const route = useRouter();
  const showLogout = route.pathname !== '/';

  return (
    <div className='w-full'>
      {showLogout && (
        <button
          type='button'
          className='w-full flex justify-end p-3'
          onClick={() => {
            route.push('/');
          }}
        >
          <LogOut size={30} />
        </button>
      )}

      <div className='text-center pt-16'>
        <strong className='text-3xl'>Agenda de Churras</strong>
      </div>
    </div>
  );
};
