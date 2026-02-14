import http from "k6/http";
import { sleep, check } from "k6";
import { SharedArray } from "k6/data";

const BASE_URL = false ? "http://host.docker.internal:3000" : "http://app:3000";

export const options = {
  stages: [
    { duration: "1m", target: 10 }, // Ramp up to 10 users over 1 minute
    { duration: "3m", target: 10 }, // Stay at 10 users for 3 minutes
    { duration: "1m", target: 0 }, // Ramp down to 0 users over 1 minute
  ],
};

const dates = new SharedArray("dates", function () {
  var dates = [];
  var currentDate = new Date();
  var minDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

  for (var i = 0; i < 100; i++) {
    var randomDate = new Date(
      minDate.getTime() +
        Math.random() * (currentDate.getTime() - minDate.getTime()),
    );
    dates.push(randomDate.toISOString());
  }

  return dates;
});

export default function () {
  const randomDate = dates[Math.floor(Math.random() * dates.length)];
  let res = http.get(`${BASE_URL}?date=${randomDate}`);

  check(res, {
    "is status 200": (r) => r.status === 200,
  });

  sleep(Math.random() * 5);
}
