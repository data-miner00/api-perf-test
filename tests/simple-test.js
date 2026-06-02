import http from "k6/http";
import { sleep, check } from "k6";

const isInsideDocker = __ENV.INSIDE_DOCKER === "true";
const BASE_URL = !isInsideDocker
  ? "http://host.docker.internal:3000"
  : "http://app:3000";

export const options = {
  duration: "5m",
  vus: 5,
};

export default function () {
  let res = http.get(`${BASE_URL}`);

  check(res, {
    "is status 200": (r) => r.status === 200,
  });

  sleep(Math.random() * 5);
}
