// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// Utils
import { haversineDistance } from "@/utils/haversine-distance";

// Constants
import { cities } from "@/constants/cities.constants";

// Types
import { Distances } from "@/types/common";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Distances[]>
) {
  const { date, passengers, ...restQueries } = req.query;
  const { origin, destination, ...intermediateRoute } = restQueries;
  const distances: Distances[] = [];

  const routes = [origin, ...Object.values(intermediateRoute), destination];

  if (origin && destination) {
    distances.push({
      name: origin,
    });

    routes.forEach((route, i) => {
      const firstCity = cities.find((city) => city.name === routes[i]);
      const secondCity = cities.find((city) => city.name === routes[i + 1]);

      if (firstCity && secondCity) {
        const distance = haversineDistance(
          [parseFloat(firstCity.lat), parseFloat(firstCity.lng)],
          [parseFloat(secondCity.lat), parseFloat(secondCity.lng)]
        );

        distances.push({
          distance: Math.trunc(distance),
          name: secondCity.name,
        });
      }
    });

    res.status(200).send(distances);
  }
}
