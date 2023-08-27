// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Barbecue, Response } from '@/common/types';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

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
}

const handleGet = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString()) as Response;
};

const handlePost = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { id, description, date, observation, suggestedValue } = req.body;
  const data = handleGet(req, res);
  if (!data['barbecues']) {
    data.barbecues = [];
  }

  data.barbecues.push({ id, description, date, observation, suggestedValue });

  fs.writeFileSync(filePath, JSON.stringify(data));
  return res.status(200).json(data);
};

const handleDelete = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { id } = req.body;

  const data = handleGet(req, res);
  const barbecueIndex = data.barbecues.findIndex(
    (barbecue: Barbecue) => barbecue.id === id,
  );
  if (barbecueIndex >= 0) {
    data.barbecues.splice(barbecueIndex, 1);
    data.participants.splice(
      data.participants.findIndex(
        (participant: any) => participant.barbecueId === id,
      ),
    );
    fs.writeFileSync(filePath, JSON.stringify(data));
  }

  return res.status(200).json(data);
};
