import { useRouter } from "next/router"
export default function Login() {
  const router = useRouter();
  return (
    <div className='flex flex-col'>

      <label htmlFor="email">E-mail</label>
      <input type="email" placeholder='e-mail' className="mb-9" />

      <label htmlFor="password">Senha</label>
      <input type="password" placeholder='senha' />
      <button type='button' onClick={() => { router.push("/barbecue") }} className='bg-black text-white rounded-2xl p-3 mt-16'>Entrar</button>
    </div >
  )
}
