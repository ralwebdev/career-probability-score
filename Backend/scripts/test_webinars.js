const API_URL = 'http://localhost:5000/api';
let adminToken = '';

async function testWebinars() {
  try {
    console.log('--- Testing Webinar API ---');

    // 1. Login to get token
    console.log('Logging in as admin...');
    const loginRes = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'Ral@12345'
      })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(`Login failed: ${loginData.message}`);
    adminToken = loginData.token;
    console.log('Login successful');

    // 2. Create a webinar
    console.log('Creating a test webinar...');
    const createRes = await fetch(`${API_URL}/webinars`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}` 
      },
      body: JSON.stringify({
        title: 'Automated Test Webinar',
        speaker: 'Test Bot',
        date: 'Dec 31, 2026',
        time: '11:59 PM',
        registrationLink: 'https://example.com'
      })
    });
    const createData = await createRes.json();
    if (!createRes.ok) throw new Error(`Create failed: ${createData.message}`);
    const testWebinarId = createData._id;
    console.log(`Webinar created with ID: ${testWebinarId}`);

    // 3. Get all webinars
    console.log('Fetching all webinars...');
    const getRes = await fetch(`${API_URL}/webinars`);
    const webinars = await getRes.json();
    if (!getRes.ok) throw new Error(`Get failed: ${webinars.message}`);
    console.log(`Found ${webinars.length} webinars`);
    const found = webinars.find(w => w._id === testWebinarId);
    if (found) {
      console.log('Successfully found the created webinar in the list');
    } else {
      throw new Error('Created webinar not found in list');
    }

    // 4. Delete the webinar
    console.log('Deleting the test webinar...');
    const deleteRes = await fetch(`${API_URL}/webinars/${testWebinarId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const deleteData = await deleteRes.json();
    if (!deleteRes.ok) throw new Error(`Delete failed: ${deleteData.message}`);
    console.log('Webinar deleted successfully');

    // 5. Verify deletion
    console.log('Verifying deletion...');
    const getResAfter = await fetch(`${API_URL}/webinars`);
    const webinarsAfter = await getResAfter.json();
    const stillExists = webinarsAfter.find(w => w._id === testWebinarId);
    if (!stillExists) {
      console.log('Deletion verified');
    } else {
      throw new Error('Webinar still exists after deletion');
    }

    console.log('--- All Webinar Tests Passed! ---');
  } catch (error) {
    console.error('Test failed:');
    console.error(error.message);
    process.exit(1);
  }
}

testWebinars();
