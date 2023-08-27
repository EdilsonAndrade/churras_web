// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Participant } from '@/common/types';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { Response } from '@/common/types';
const filePath = path.join(process.cwd(), 'data', 'churras.json');

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  if (req.method === 'POST') {
    return handlePost(req, res);
  }
  if (req.method === 'GET') {
    const response = handleGet(req, res);
    return res.status(200).json(response);
  }
  if (req.method === 'DELETE') {
    return handleDelete(req, res);
  }
  if (req.method === 'PUT') {
    return handlePut(req, res);
  }
}

const handleGet = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString()) as Response;
  const participants = data.participants || [];
  const barbecues = data.barbecues || [];
  const users = data.users || [];

  return { participants, barbecues, users };
};

const handlePost = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { id, barbecueId, name, amount, drink, paid } = req.body;
  const data = handleGet(req, res);
  if (!data['participants']) {
    data.participants = [];
  }
  data.participants.push({ id, barbecueId, name, amount, drink, paid });
  fs.writeFileSync(filePath, JSON.stringify(data));
  return res.status(200).json(data);
};

const handleDelete = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { id } = req.body;
  const data = handleGet(req, res);
  const participantIndex = data.participants.findIndex(
    (participant: Participant) => participant.id === id,
  );
  if (participantIndex >= 0) {
    data.participants.splice(participantIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(data));
  }

  return res.status(200).json(data);
};

const handlePut = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { id } = req.body;

  const data = handleGet(req, res);
  const participantIndex = data.participants.findIndex(
    (participant: Participant) => participant.id === id,
  );
  if (participantIndex >= 0) {
    data.participants[participantIndex].paid =
      !data.participants[participantIndex].paid;
    fs.writeFileSync(filePath, JSON.stringify(data));
  }
  return res.status(200).json(data);
};
