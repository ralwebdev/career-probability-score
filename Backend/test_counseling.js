const http = require('http');

const data = JSON.stringify({
    name: "Test User",
    phone: "1234567890",
    email: "test@example.com",
    careerInterest: "UI Design",
    budget: "10-50k",
    time: "3-6",
    mode: "online",
    schedule: "weekends",
    country: "India",
    preferredTime: "420",
    preferredDate: new Date().toISOString()
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/counseling',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
        responseBody += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response:', JSON.parse(responseBody));
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
