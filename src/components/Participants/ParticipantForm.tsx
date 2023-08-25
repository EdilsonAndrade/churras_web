import { useDispatch } from 'react-redux';
import { addParticipant } from '@/redux/reducers/participantReducer';
import { useState } from 'react';
import classNames from 'classnames';

export const ParticipantForm = ({ barbecueId, suggestedValue }: { barbecueId: string, suggestedValue: number }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(suggestedValue || 0);
  const [drink, setDrink] = useState(0);

  const dispatch = useDispatch();

  const handleAddParticipant = () => {
    dispatch(addParticipant({
      name,
      amount,
      paid: false,
      id: Math.floor(Math.random() * 1000).toString(),
      barbecueId,
      drink
    }))
    setName('')
    setAmount(suggestedValue || 0)
    setDrink(0)
  }
  return (
    <>
      <div className="flex w-full justify-start items-center mt-10">
        <div>
          <label htmlFor="name" className='mr-1'>Nome:</label>
          <input type="text" required placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="ml-5">
          <label htmlFor="amount" className='mr-1'>Carnes:</label>
          <input type="number" min={suggestedValue} placeholder="Contribuição" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
        </div>
        <div className='ml-5'>
          <label htmlFor="amount" className='mr-1'>Bebidas:</label>
          <input type="number" min={0} placeholder="Contribuição" value={drink} onChange={(e) => setDrink(parseInt(e.target.value))} />
        </div>

      </div>
      <button disabled={!name || !amount} type="button" className={classNames("p-2 mt-5 bg-black text-white rounded-md w-full", {
        'opacity-50 cursor-not-allowed': !name || !amount
      })} onClick={handleAddParticipant}>Adicionar</button>
    </>
  )
}



