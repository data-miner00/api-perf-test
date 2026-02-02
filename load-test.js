import http from "k6/http";

const BASE_URL = false ? "http://host.docker.internal:3000" : "http://app:3000";

export default function () {
  http.get(`${BASE_URL}`);
}
