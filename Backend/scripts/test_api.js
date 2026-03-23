// const fetch = require('node-fetch'); // Built-in fetch used in Node 18+

const API_BASE_URL = 'http://localhost:5000/api';

const testApi = async () => {
    try {
        console.log('Testing GET /api/courses...');
        const res = await fetch(`${API_BASE_URL}/courses`);
        const courses = await res.json();
        console.log(`Found ${courses.length} courses.`);
        
        if (courses.length > 0) {
            const firstId = courses[0].id;
            console.log(`Testing GET /api/courses/${firstId}...`);
            const res2 = await fetch(`${API_BASE_URL}/courses/${firstId}`);
            const course = await res2.json();
            console.log(`Successfully fetched course: ${course.title}`);
        }
        
        console.log('API verification successful!');
    } catch (error) {
        console.error('API verification failed (Make sure the server is running):', error.message);
    }
};

testApi();
