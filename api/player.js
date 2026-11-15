module.exports = async function handler(req, res) {
  // 캐시 완전 차단
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { server, name } = req.query;

  if (!server || !name) {
    return res.status(400).json({ error: 'server and name are required' });
  }

  // API 키를 코드에 직접 넣음 (요청에 따라)
  const apiKey = 'lap_a5aEyZQCHj66h7VWABjq3e3bOFN68RZIjTQxouFCVd8';

  try {
    // ?fresh=1 로 항상 게임에서 최신 좌표를 기다림 (캐시 무시)
    const url = `https://api.lastasylumtracker.com/v1/players/${encodeURIComponent(server)}/${encodeURIComponent(name)}?fresh=1&_=${Date.now()}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.detail || data.message || data.error || 'API error',
      });
    }

    return res.status(200).json({
      nick: data.nick || data.nick_name || name,
      x: data.x,
      y: data.y,
      uid: data.uid || data.player_id,
      cached: data.cached,
      age_seconds: data.age_seconds,
      refreshing: data.refreshing,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch from upstream API' });
  }
};
