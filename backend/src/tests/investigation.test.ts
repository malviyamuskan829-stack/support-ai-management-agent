// Integration test for Support AI Management Agent Backend
import http from 'http';

const PORT = Number(process.env.PORT) || 4000;

async function runTests() {
  console.log('🧪 Running Backend Integration Tests...');
  let passed = 0;
  let total = 0;

  // Test 1: Health check
  total++;
  try {
    const healthRes = await fetch(`http://localhost:${PORT}/health`);
    const healthData = await healthRes.json();
    if (healthRes.ok && healthData.status === 'ok') {
      console.log('✅ Test 1 Passed: GET /health returns 200 OK');
      passed++;
    } else {
      console.error('❌ Test 1 Failed: GET /health unexpected response', healthData);
    }
  } catch (err: any) {
    console.error('❌ Test 1 Failed: Cannot reach /health:', err.message);
  }

  // Test 2: AI Investigation validation on missing data
  total++;
  try {
    const invalidRes = await fetch(`http://localhost:${PORT}/api/ai/investigate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    if (invalidRes.status === 400) {
      console.log('✅ Test 2 Passed: POST /api/ai/investigate validates missing payload (400)');
      passed++;
    } else {
      console.error(`❌ Test 2 Failed: Expected 400, got ${invalidRes.status}`);
    }
  } catch (err: any) {
    console.error('❌ Test 2 Failed:', err.message);
  }

  // Test 3: KB Search endpoint
  total++;
  try {
    const kbRes = await fetch(`http://localhost:${PORT}/api/kb/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'Billing', keywords: 'refund' }),
    });
    const kbData = await kbRes.json();
    if (kbRes.ok && Array.isArray(kbData) && kbData.length > 0) {
      console.log('✅ Test 3 Passed: POST /api/kb/search returns matching SOP runbooks');
      passed++;
    } else {
      console.error('❌ Test 3 Failed:', kbData);
    }
  } catch (err: any) {
    console.error('❌ Test 3 Failed:', err.message);
  }

  console.log(`\n📊 Test Results: ${passed}/${total} tests passed.\n`);
  if (passed !== total) {
    process.exitCode = 1;
  }
}

runTests();
