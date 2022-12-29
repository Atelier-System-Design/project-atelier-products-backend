import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 200, // how large the initial pool of VUs would be
      maxVUs: 300, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 200ms
  },
};

export default function () {
  let page = randomIntBetween(1, 200000);
  const res = http.get(`http://localhost:3000/products?page=${page}`);
};

