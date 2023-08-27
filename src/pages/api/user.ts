// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { Barbecue } from '@/common/types'
import { User } from '@/common/types'
import bcrypt from 'bcrypt'
type Data = {
  message: string
  users: User[]
}
const filePath = path.join(process.cwd(), 'data', 'churras.json')

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    return handlePost(req, res)
  }
  if (req.method === 'GET') {
    const response = handleGet(req, res)
    return res.status(200).json(response)
  }

}

const handleGet = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const fileData = fs.readFileSync(filePath)
  return JSON.parse(fileData.toString()) as Data
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body
  const salt = 12
  const data = handleGet(req, res)
  if (!data["users"]) {
    data.users = []
  }
  const userExists = data.users.find(user => user.email.toLocaleLowerCase() === email.toLocaleLowerCase())
  if (userExists) {
    return res.status(400).json({ message: "Usuário já cadastrado", users: [] })
  }
  const encryptPassword = await bcrypt.hash(password, salt)
  data.users.push({ email, password: encryptPassword })

  fs.writeFileSync(filePath, JSON.stringify(data))
  return res.status(200).json(data)
}



