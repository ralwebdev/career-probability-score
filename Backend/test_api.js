const http = require('http');

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function testApi() {
  try {
    // Check if server is running before starting tests
    try {
      await request('GET', '/');
    } catch (e) {
      if (e.code === 'ECONNREFUSED') {
        console.error('Error: Backend server is not running on http://localhost:5000');
        console.log('Please run "npm start" in the Backend directory first.');
        process.exit(1);
      }
    }

    console.log('Testing GET /api/assessments/analytics/stats...');
    const statsRes = await request('GET', '/api/assessments/analytics/stats');
    console.log('Stats Response:', statsRes.status, statsRes.data);

    console.log('\nTesting POST /api/leads...');
    const leadRes = await request('POST', '/api/leads', {
      name: 'Test User',
      phone: '1234567890',
      courseTitle: 'Full-Stack Development',
      source: 'inline'
    });
    console.log('Lead Response:', leadRes.status, leadRes.data);

    console.log('\nTesting GET /api/leads...');
    const allLeadsRes = await request('GET', '/api/leads');
    console.log('All Leads (count):', allLeadsRes.status, Array.isArray(allLeadsRes.data) ? allLeadsRes.data.length : 'N/A');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testApi();
