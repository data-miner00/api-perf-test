import http from "k6/http";
import { sleep, check } from "k6";

const BASE_URL = false ? "http://host.docker.internal:3000" : "http://app:3000";

export const options = {
  stages: [
    { duration: "30s", target: 1500 }, // Ramp up to 1500 users over 30 seconds
    { duration: "3m", target: 1500 }, // Stay at 1500 users for 3 minutes
    { duration: "30s", target: 0 }, // Ramp down to 0 users over 30 seconds
  ],
};

export default function () {
  let res = http.get(`${BASE_URL}`);

  check(res, {
    "is status 200": (r) => r.status === 200,
  });

  sleep(Math.random() * 5);
}
