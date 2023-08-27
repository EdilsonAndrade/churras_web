import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { UserPlus } from 'react-feather'
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleAuthentication = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response.json();

    if (response.status === 200) {
      router.push("/barbecue")
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
  return (
    <div className='flex flex-col'>

      <label htmlFor="email">E-mail</label>
      <input type="email" placeholder='e-mail' value={email} onChange={(e) => { setEmail(e.target.value) }} className="mb-9" />

      <label htmlFor="password">Senha</label>
      <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='senha' />
      <button type='button' onClick={handleAuthentication} className='bg-black text-white rounded-2xl p-3 mt-16'>Entrar</button>
      <Link href="/signup" className="mt-3 flex items-center justify-center text-xs"><UserPlus size={17} className="mr-1" /> Não tem cadastro? Clique aqui</Link>
    </div >
  )
}
