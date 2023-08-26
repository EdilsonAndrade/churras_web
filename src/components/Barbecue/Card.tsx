import { Barbecue, Response } from '@/common/types';
import { MoneyIcon } from '@/customIcons/MoneyIcon';
import { ParticipantIcon } from '@/customIcons/ParticipantIcon';
import { BarbecueHeader } from './BarbecueHeader';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '@/redux/store';
import { Trash } from 'react-feather';
import { useDispatch } from 'react-redux';
import { setBarbecues } from '@/redux/reducers/barbecueReducer';


export default function Card({ description, date, onClick, id, observation }: Barbecue) {
  const participantState = useSelector((state: RootState) => state.participant)
  const participants = participantState.participants?.filter(participant => participant.barbecueId === id)

  const food = participants?.reduce((acc, participant) => acc + participant.amount, 0)
  const drink = participants?.reduce((acc, participant) => acc + participant.drink, 0)
  const totalAmount = food + drink

  const dispatch = useDispatch()
  const handleDeleteEvent = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/barbecue`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      }),
    })

    const data = await response.json() as Response;

    dispatch(setBarbecues(data.barbecues))

  }

  return (
    <div className='flex flex-col px-3 py-2 shadow-lg justify-center bg-white'>
      <div className='flex w-full justify-between items-baseline'>
        <BarbecueHeader date={date} description={description} id={id} observation={observation} />
        <button type="button" onClick={handleDeleteEvent}><Trash size={17} /></button>
      </div>
      <div className="flex justify-between mt-6 items-center w-full" >
        <button type="button" className='flex items-center justify-between w-8 group' onClick={onClick} >

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
