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

  // 임시로 키를 코드에 넣음 (나중에 환경변수로 바꾸는 것을 권장)
  const apiKey = 'lap_a5aEyZQCHj66h7VWABjq3e3bOFN68RZIjTQxouFCVd8';

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
