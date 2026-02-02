import http from "k6/http";

const BASE_URL = true
  ? "http://host.docker.internal:3000"
  : "http://localhost:3000";

export default function () {
  http.get(`${BASE_URL}`);
}
