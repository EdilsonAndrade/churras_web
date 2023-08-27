import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { LogIn } from 'react-feather';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const UserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);

  const handleAddUser = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 1000).toString(),
        email,
        password
      })
    })

    const data = await response.json();

    if (response.status === 200) {
      toast('Usuário cadastrado, redirecionando para login!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } else {
      toast(`Oops ocorreu um erro: ${data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }


  }
  const passwordMatch = (password === passwordConfirmation)

  const handleValidateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const isValidEmail = handleValidateEmail()
  const isDisable = !email || !password || !passwordConfirmation || !passwordMatch || !isValidEmail
  return (
    <>
      <div className='flex flex-col'>
        <label htmlFor="email" >E-mail</label>
        <input ref={emailRef} type="email" required placeholder="E-mail" value={email} className={`${!isValidEmail && "border border-red-500"}`} onChange={(e) => setEmail(e.target.value)} />
        {!isValidEmail && !!email && <small className="text-red-600 text-xs">E-mail inválido</small>}
        <label htmlFor="password" className='mr-4'>Senha</label>
        <input type="password" required placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="passwordConfirmation" className='mr-4'>Confirme sua Senha</label>
        <input type="password" required placeholder="Confirme sua Senha" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        {!passwordMatch && (!!password && !!passwordConfirmation) && <small className="text-red-600 text-xs">As senhas não conferem</small>}
        <button disabled={isDisable} type="button" className={classNames("w-full p-2 mt-5 bg-black text-white rounded-md w-32", {
          'opacity-50 cursor-not-allowed': isDisable
        })} onClick={handleAddUser}>Salvar</button>
      </div>
      <Link href="/" className="mt-3 flex items-center justify-center ">Já tem cadastro? <LogIn size={17} className="mr-1" />Clique aqui</Link>
    </>
  )
}



