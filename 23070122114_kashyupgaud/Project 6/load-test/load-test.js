import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Normal traffic
    { duration: '1m', target: 200 }, // Heavy traffic spike
    { duration: '2m', target: 200 }, // Sustained load to trigger scale-out
    { duration: '30s', target: 0 },  // Scale down
  ],
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';

export default function () {
  // Simulate read traffic
  let res = http.get(`${BASE_URL}/api/posts`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  
  sleep(1);
  
  // Simulate write traffic randomly
  if (Math.random() < 0.2) {
    let postRes = http.post(`${BASE_URL}/api/posts`, JSON.stringify({
      content: 'Hello from k6 load tester!',
      user_name: 'k6 User',
      user_id: 'k6_user'
    }), { headers: { 'Content-Type': 'application/json' } });
    check(postRes, { 'post created': (r) => r.status == 201 });
  }

  sleep(1);
}
