// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '@/common/types';
import bcrypt from 'bcrypt';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

type Data = {
  message: string;
  users?: User[];
};
const filePath = path.join(process.cwd(), 'data', 'churras.json');

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    return handlePost(req, res);
  }
}

const handleGet = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString()) as Data;
};

const handlePost = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { email, password } = req.body;
    const data = handleGet(req, res);

    const user = data?.users?.find(
      (user) => user.email.toLocaleLowerCase() === email.toLocaleLowerCase(),
    );

    if (!user || !data['users']) {
      return res.status(404).json({ message: 'Usuário não cadastrado' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Usuário ou Senha inválida' });
    }

    return res.status(200).json({ message: 'Usuário logado com sucesso' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Ocorreu um erro, tente novamente mais tarde!' });
  }
};
