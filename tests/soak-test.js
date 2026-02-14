import http from "k6/http";
import { sleep, check } from "k6";

const BASE_URL = false ? "http://host.docker.internal:3000" : "http://app:3000";

export const options = {
  stages: [
    { duration: "1m", target: 200 }, // Ramp up to 200 users over 1 minute
    { duration: "8h", target: 200 }, // Stay at 200 users for 8 hours
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
