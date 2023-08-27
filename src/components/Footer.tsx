import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const Footer = () => {
  const router = useRouter();
  const routerPath = router.pathname;

  return (
    <div
      className={classNames('flex justify-center w-full pb-5', {
        'bg-white p-1': routerPath === '/schedule',
      })}
    >
      <Image src={'/assets/trinca.png'} width={48} height={48} alt='Trinca' />
    </div>
  );
};
