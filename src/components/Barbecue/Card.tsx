import { Barbecue } from '@/common/types';
import { MoneyIcon } from '@/customIcons/MoneyIcon';
import { ParticipantIcon } from '@/customIcons/ParticipantIcon';
import { BarbecueHeader } from './BarbecueHeader';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '@/redux/store';


export default function Card({ description, date, onClick, id, observation }: Barbecue) {
  const participantState = useSelector((state: RootState) => state.participant)
  const participants = participantState.participants.filter(participant => participant.barbecueId === id)
  const food = participants.reduce((acc, participant) => acc + participant.amount, 0)
  const drink = participants.reduce((acc, participant) => acc + participant.drink, 0)
  const totalAmount = food + drink


  return (
    <div className='flex flex-col px-3 py-2 shadow-lg justify-center bg-white' onClick={onClick} role="button">
      <BarbecueHeader date={date} description={description} id={id} observation={observation} />
      <div className="flex justify-between mt-6 items-center w-full">
        <button type="button" className='flex items-center justify-between w-8 group'>

          <ParticipantIcon />
          <span>{participants.length}</span>
        </button>
        <div className='flex items-center justify-between w-[75px]'>
          <MoneyIcon />
          <span>{`R$ ${totalAmount}`}</span>
        </div>
      </div>
    </div>
  )
}
