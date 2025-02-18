import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    vus: 100, // 100 virtual users
    duration: '30s',
}

export default function () {
    const res = http.get('http://localhost:5173/')
    check(res, {
        'is status 200': (r) => r.status === 200,
        'transaction time < 200ms': (r) => r.timings.duration < 200,
    })
    sleep(1)
}