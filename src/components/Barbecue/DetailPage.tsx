import { BarbecueHeader } from '@/components/Barbecue/BarbecueHeader';
import { ParticipantForm } from '@/components/Participants/ParticipantForm';
import { ParticipantList } from '@/components/Participants/ParticipantList';
import { MoneyIcon } from '@/customIcons/MoneyIcon';
import { ParticipantIcon } from '@/customIcons/ParticipantIcon';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeftCircle } from 'react-feather';
import { useSelector } from 'react-redux';

export const DetailPage = () => {
  const barbecues = useSelector((state: RootState) => state.barbecue.barbecues);
  const participants = useSelector(
    (state: RootState) => state.participant.participants,
  );

  const route = useRouter();
  const { barbecueId } = route.query as { barbecueId: string };
  const barbecueIdString = barbecueId as string;
  const barbecue = barbecues.find((barbecue) => barbecue.id === barbecueId);
  const barbecueParticipants = participants.filter(
    (participant) => participant.barbecueId === barbecueId,
  );
  const food = barbecueParticipants.reduce(
    (acc, participant) => acc + participant.amount,
    0,
  );
  const drink = barbecueParticipants.reduce(
    (acc, participant) => acc + participant.drink,
    0,
  );
  const total = food + drink;

  const handleBack = () => {
    route.push('/barbecue');
  };
  return (
    <main className='relative mt-20 flex min-h-screen flex-col items-center pt-10 bg-white'>
      {barbecue && barbecueId ? (
        <div className='flex flex-col justify-between shadow-lg px-3 py-2 bg-white absolute -top-10 mx-2'>
          <button onClick={handleBack} type='button'>
            <ArrowLeftCircle size={20} />
          </button>
          <div className='w-full flex justify-between' onClick={handleBack}>
            <BarbecueHeader
              id={barbecueId}
              date={barbecue.date}
              description={barbecue.description}
              observation={barbecue.observation}
            />
            <div className='w-20'>
              <div className='flex items-center'>
                <ParticipantIcon />{' '}
                <span className='ml-2'>{participants.length}</span>
              </div>
              <div className='flex items-center'>
                <MoneyIcon />
                <span className='ml-2'>{total}</span>
              </div>
              <div className='flex items-center'>
                <Image
                  src='/assets/beer.png'
                  width={20}
                  height={16}
                  alt='drink'
                />
                <span className='ml-2'>{drink}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col justify-between'>
              {barbecueParticipants.map((participant) => {
                const { name, paid, amount, id, drink } = participant;
                return (
                  <ParticipantList
                    id={id}
                    key={id}
                    name={name}
                    paid={paid}
                    amount={amount}
                    drink={drink}
                  />
                );
              })}
            </div>

            <ParticipantForm
              barbecueId={barbecueIdString}
              suggestedValue={barbecue.suggestedValue || 0}
            />
          </div>
        </div>
      ) : (
        <>
          <button onClick={handleBack} type='button'>
            <ArrowLeftCircle size={40} />
          </button>
          <strong>Nenhum churras encontrado com o id {barbecueId}</strong>
        </>
      )}
    </main>
  );
};
