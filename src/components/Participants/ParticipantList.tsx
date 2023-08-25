import { useDispatch } from 'react-redux'
import { changePaidStatus, removeParticipant } from '@/redux/reducers/participantReducer'
import classNames from 'classnames';
import { Trash } from 'react-feather'
import Image from 'next/image';

export const ParticipantList = ({ id, name, paid, amount, drink = 0 }: { id: string, name: string, paid: boolean, amount: number, drink: number }) => {
  const dispatch = useDispatch();

  const handlePaid = () => {
    dispatch(changePaidStatus(id))
  }

  const handleDelete = () => {
    dispatch(removeParticipant(id))
  }


  return (
    <div className="flex px-5 items-center justify-between font-semibold border border-t-0 border-x-0 border-amber-300">
      <div className="flex items-center w-2/4 py-2">

        <input type="radio" checked={paid} onClick={handlePaid} />


        <span className="ml-3">{name}</span>

      </div>
      <div className="w-2/4 flex justify-end">
        <span className={classNames({
          'line-through': paid,
        })}>R${amount}</span>
        <span className={classNames("ml-1 flex items-center", {
          'line-through': paid,
        })}><Image src="/assets/beer.png" width={16} height={16} alt="drink" />R${drink}</span>
      </div>

      <button onClick={handleDelete}>
        <Trash size={17} className='ml-1' />
      </button>
    </div>
  )
}
