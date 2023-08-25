import React, { useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { addBarbecue } from '@/redux/reducers/barbecueReducer';


export const NewBarbecueEvent = ({ onClose }: { onClose: () => void }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [suggestedValue, setSuggestedValue] = useState(0);
  const [observation, setObservation] = useState('');

  const today = new Date()
  const dispatch = useDispatch();
  const handleSaveEvent = async (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addBarbecue({
      date: startDate,
      description,
      suggestedValue,
      observation,
      id: Math.floor(Math.random() * 1000).toString()
    }))

    onClose();
  }

  return (
    <div className="flex flex-col  justify-center p-4 rounded-sm shadow-md bg-white" >
      <label htmlFor="description">Data do churras</label>
      <DatePicker className='border border-amber-300 mb-9' minDate={today} selected={startDate} onChange={(date: Date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />

      <label htmlFor="description">Descrição</label>
      <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Descrição' className="mb-9 border border-amber-300" />
      <label htmlFor="valorSugerido">Valor sugerido</label>
      <input onChange={(e) => setSuggestedValue(parseInt(e.target.value))} value={suggestedValue} type="number" placeholder='000' className="mb-9 border w-20 border-amber-300" />
      <label htmlFor="observacao">Observação</label>
      <textarea name="observacao" maxLength={40} onChange={(e) => setObservation(e.target.value)} id="observacao" value={observation} cols={30} rows={2} className="mb-9 border border-amber-300"></textarea>

      <div className='flex justify-between mt-10'>
        <button type="button" className='bg-red-500 text-white rounded-md w-36' onClick={() => onClose()}>Cancelar</button>
        <button type='button' className='ml-2 p-3 bg-black text-white rounded-md w-36' onClick={handleSaveEvent}>Salvar</button>
      </div>
    </div>
  )

}
