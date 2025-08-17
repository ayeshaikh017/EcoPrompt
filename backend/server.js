const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

/** In-memory users DB:
 * users = {
 *   username: { password: '...', history: ['I am taking a flight', ...] }
 * }
 */
const users = {};

/** Helper: safe history push (unique) */
function pushHistory(username, action){
  if(!username || !users[username]) return;
  if(!users[username].history.includes(action)){
    users[username].history.push(action);
  }
}

/** Analyze */
function analyzeImpact(action) {
  const a = (action || '').toLowerCase();
  const response = {
    carbonFootprint: '',
    waterUsage: '',
    waste: '',
    ecoAlternatives: '',
    ecoScore: 0,
    potentialScore: 0,
    suggestions: []
  };

  if(a.includes('flight')){
    response.carbonFootprint = 'Taking a 1,000 km flight adds ~200–250 kg CO₂ (≈ 1 month of average car driving).';
    response.waterUsage = 'Indirect ~1,000 liters (≈ 14 short showers).';
    response.waste = 'Plastic cutlery & meal packaging tends to go to landfill.';
    response.ecoAlternatives = '🚆 Use trains/buses.\n🌱 Offset carbon with verified programs.\n✈️ Prefer airlines using biofuels.';
    response.ecoScore = 35;
    response.potentialScore = 70;
    response.suggestions = [
      'Minimize flights or combine trips.',
      'Use carbon offsets 🌍.',
      'Pack light ✨ (less fuel burn).',
      'Prefer direct flights when possible.',
      'Choose eco-friendly airlines.'
    ];
  } else if(a.includes('meat')){
    response.carbonFootprint = 'Beef ≈ 27 kg CO₂ per kg (≈ driving 100 km).';
    response.waterUsage = 'Beef ≈ 15,000 liters of water (≈ 95 bathtubs).';
    response.waste = 'Food & plastic packaging often end up in landfill.';
    response.ecoAlternatives = '🍀 Try plant-based meals.\n🥕 Buy local/seasonal produce.';
    response.ecoScore = 50;
    response.potentialScore = 80;
    response.suggestions = [
      'Swap meat with plant proteins 2–3 times/week.',
      'Buy local & seasonal produce.',
      'Compost leftovers instead of trash.'
    ];
  } else if(a.includes('bicycle') || a.includes('cycle') || a.includes('bike to work')){
    response.carbonFootprint = 'Cycling has near-zero tailpipe CO₂.';
    response.waterUsage = 'Minimal indirect water use.';
    response.waste = 'Very low waste (maintain tyres/chain responsibly).';
    response.ecoAlternatives = '🚲 Keep tyres inflated.\n🛠️ Service bike for efficiency.';
    response.ecoScore = 85;
    response.potentialScore = 95;
    response.suggestions = [
      'Use a reusable bottle and lights for safety.',
      'Combine errands to avoid extra trips.'
    ];
  } else {
    response.carbonFootprint = 'Impact depends on the activity.';
    response.waterUsage = 'Impact depends on the activity.';
    response.waste = 'Impact depends on the activity.';
    response.ecoAlternatives = 'Look for low-carbon, low-waste alternatives.';
    response.ecoScore = 60;
    response.potentialScore = 75;
    response.suggestions = [
      'Use reusables over single-use ♻️.',
      'Choose energy-efficient options.'
    ];
  }
  return response;
}

/** AUTH ROUTES */
app.post('/signup', (req, res) => {
  const { username, password } = req.body || {};
  if(!username || !password) return res.status(400).json({ success:false, message:'Username and password required' });

  if(users[username]) return res.status(409).json({ success:false, message:'User already exists. Please log in.' });

  users[username] = { password, history: [] };
  return res.json({ success:true, message:'Signup successful', history: [] });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if(!username || !password) return res.status(400).json({ success:false, message:'Username and password required' });

  const user = users[username];
  if(!user || user.password !== password) return res.status(401).json({ success:false, message:'Invalid username or password' });

  return res.json({ success:true, message:'Login successful', history: user.history });
});

/** IMPACT ROUTE */
app.post('/checkImpact', (req, res) => {
  const { action, username } = req.body || {};
  if(!action) return res.status(400).json({ error:'Action is required' });

  const analysis = analyzeImpact(action);
  if(username && users[username]) pushHistory(username, action);

  return res.json({ action, analysis });
});

/** Serve frontend (optional if you run separate dev servers) */
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

