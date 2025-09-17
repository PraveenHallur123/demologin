const users = {}; // This won't persist between requests!

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const { username, password } = JSON.parse(event.body);

  if (!username || !password) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'All fields are required' }) };
  }

  if (!users[username] || users[username] !== password) {
    return { statusCode: 401, body: JSON.stringify({ success: false, message: 'Invalid credentials' }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: 'Login successful' })
  };
};
