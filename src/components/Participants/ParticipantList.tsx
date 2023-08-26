import { useDispatch } from 'react-redux'
import { changePaidStatus, setParticipant } from '@/redux/reducers/participantReducer'
import classNames from 'classnames';
import { Trash } from 'react-feather'
import Image from 'next/image';
import React from 'react';
import { Response } from '@/common/types';

export const ParticipantList = ({ id, name, paid, amount, drink = 0 }: { id: string, name: string, paid: boolean, amount: number, drink: number }) => {
  const dispatch = useDispatch();
  const handlePaid = async () => {
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/participant', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        paid: !paid,
        name,
        amount
      })
    })
    dispatch(changePaidStatus(id))
  }

  const handleDelete = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/participant', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,

      })
    })

    const data = await response.json() as Response;
    dispatch(setParticipant(data.participants))
  }


  return (
    <div className="flex px-5 items-center justify-between font-semibold border border-t-0 border-x-0 border-amber-300">
      <div className="flex items-center w-2/4 py-2">
        <input type="checkbox" onChange={handlePaid} checked={paid} className='invisible' />
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
