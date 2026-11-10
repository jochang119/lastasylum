module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { server, name } = req.query;

  if (!server || !name) {
    return res.status(400).json({ error: 'server and name are required' });
  }

  const apiKey = process.env.LAST_ASYLUM_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  try {
    const url = `https://api.lastasylumtracker.com/v1/players/${encodeURIComponent(server)}/${encodeURIComponent(name)}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'LastAsylum-Coords-Tool/1.0',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.detail || data.message || 'API error',
      });
    }

    return res.status(200).json({
      nick: data.nick || data.nick_name,
      x: data.x,
      y: data.y,
      uid: data.uid || data.player_id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch from upstream API' });
  }
};
