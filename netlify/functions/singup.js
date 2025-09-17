const users = {}; // This is in-memory only! It resets on each function call.

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const { username, password } = JSON.parse(event.body);

  if (!username || !password) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'All fields are required' }) };
  }

  if (users[username]) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'User already exists' }) };
  }

  users[username] = password;

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: 'User registered successfully' })
  };
};
