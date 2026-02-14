import http from "k6/http";
import { sleep, check } from "k6";

const BASE_URL = false ? "http://host.docker.internal:3000" : "http://app:3000";

export const options = {
  stages: [
    { duration: "1m", target: 10 }, // Ramp up to 10 users over 1 minute
    { duration: "3m", target: 10 }, // Stay at 10 users for 3 minutes
    { duration: "1m", target: 0 }, // Ramp down to 0 users over 1 minute
  ],
};

export default function () {
  let res = http.get(`${BASE_URL}`);

  check(res, {
    "is status 200": (r) => r.status === 200,
  });

  sleep(Math.random() * 5);
}
