# Load Test

Exploring Grafana k6 for API performance test.

## Testing

```
docker run --rm -i -v "$(pwd):/home/k6/" grafana/k6 run --env INSIDE_DOCKER=false tests/simple-test.js
docker run --rm -i -v "$(pwd):/home/k6/" grafana/k6 run --env INSIDE_DOCKER=false tests/load-test.js
docker run --rm -i -v "$(pwd):/home/k6/" grafana/k6 run --env INSIDE_DOCKER=false tests/soak-test.js
docker run --rm -i -v "$(pwd):/home/k6/" grafana/k6 run --env INSIDE_DOCKER=false tests/spike-test.js
docker run --rm -i -v "$(pwd):/home/k6/" grafana/k6 run --env INSIDE_DOCKER=false tests/stress-test.js
```

Alternative, use docker-compose.

```
docker-compose up -d
```

## Links

- https://expressjs.com/
- https://k6.io/
- [How to do Performance Testing with k6](https://www.youtube.com/watch?v=ghuo8m7AXEM)
