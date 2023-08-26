import React, { useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setBarbecues } from '@/redux/reducers/barbecueReducer';
import { Response } from '@/common/types';


const apiRoute = process.env.NEXT_PUBLIC_API_URL

export const NewBarbecueEvent = ({ onClose }: { onClose: () => void }) => {
  const [eventDate, setEventDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [suggestedValue, setSuggestedValue] = useState(0);
  const [observation, setObservation] = useState('');

  const today = new Date()
  const dispatch = useDispatch();
  const handleSaveEvent = async (e: React.MouseEvent) => {
    e.preventDefault();

    const response = await fetch(apiRoute + '/barbecue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: eventDate,
        description,
        suggestedValue,
        observation,
        id: Math.floor(Math.random() * 1000).toString()
      })
    })
    const data = await response.json() as Response;

    dispatch(setBarbecues(data.barbecues))
    onClose();
  }

  const disableSave = !description || !eventDate


  return (
    <div className="flex flex-col  justify-center p-4 rounded-sm shadow-md bg-white" >
      <label htmlFor="description">Data do churras</label>
      <DatePicker className='border border-amber-300 mb-9' minDate={today} selected={eventDate} onChange={(date: Date) => setEventDate(date)} dateFormat="dd/MM/yyyy" />

      <label htmlFor="description">Descrição</label>
      <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Descrição' className="mb-9 border border-amber-300" />
      <label htmlFor="valorSugerido">Valor sugerido</label>
      <input onChange={(e) => setSuggestedValue(parseInt(e.target.value))} value={suggestedValue} type="number" placeholder='000' className="mb-9 border w-20 border-amber-300" />
      <label htmlFor="observacao">Observação</label>
      <textarea name="observacao" maxLength={40} onChange={(e) => setObservation(e.target.value)} id="observacao" value={observation} cols={30} rows={2} className="mb-9 border border-amber-300"></textarea>

      <div className='flex justify-between mt-10'>
        <button type="button" className='bg-red-500 text-white rounded-md w-36' onClick={() => onClose()}>Cancelar</button>
        <button type='button' disabled={disableSave} className={classNames('ml-2 p-3 bg-black text-white rounded-md w-36', {
          'opacity-50 cursor-not-allowed': disableSave
        })} onClick={handleSaveEvent}>Salvar</button>
      </div>
    </div>
  )

}
