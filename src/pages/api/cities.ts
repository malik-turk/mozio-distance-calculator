// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// Constants
import { cities } from '@/constants/cities.constants'

// Types
import { Cities } from '@/types/common';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Cities[]>
) {
  res.status(200).json(cities)
}
