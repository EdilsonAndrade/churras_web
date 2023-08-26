import { useDispatch } from 'react-redux';
import { setParticipant } from '@/redux/reducers/participantReducer';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

export const ParticipantForm = ({ barbecueId, suggestedValue }: { barbecueId: string, suggestedValue: number }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(suggestedValue || 0);
  const [drink, setDrink] = useState(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || isDisable) return;

    handleAddParticipant();
  }
  const handleAddParticipant = async () => {


    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/participant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        amount,
        paid: false,
        id: Math.floor(Math.random() * 1000).toString(),
        barbecueId,
        drink
      })
    })
    const data = await response.json();
    dispatch(setParticipant(data.participants));
    setName('')
    setAmount(suggestedValue || 0)
    setDrink(0)
    nameRef.current?.focus()
  }

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const isDisable = !name || !amount

  return (
    <>
      <div className="flex w-full justify-start items-center mt-10">
        <div>
          <label htmlFor="name" className='mr-1'>Nome:</label>
          <input ref={nameRef} type="text" required placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
        <div className="ml-5">
          <label htmlFor="amount" className='mr-1'>Carnes:</label>
          <input type="number" min={suggestedValue} placeholder="Contribuição" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} onKeyDown={handleKeyDown} />
        </div>
        <div className='ml-5'>
          <label htmlFor="amount" className='mr-1'>Bebidas:</label>
          <input type="number" min={0} placeholder="Contribuição" value={drink} onChange={(e) => setDrink(parseInt(e.target.value))} />
        </div>

      </div>
      <div className='w-full text-right'>
        <button disabled={isDisable} type="button" className={classNames("p-2 mt-5 bg-black text-white rounded-md w-32", {
          'opacity-50 cursor-not-allowed': isDisable
        })} onClick={handleAddParticipant}>Adicionar</button>
      </div>
    </>
  )
}



