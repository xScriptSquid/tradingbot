router.get('/time', async (req, res) => {
  const { getKrakenTime } = require('../services/krakenService');
  const time = await getKrakenTime();
  res.json(time);
});
useEffect(() => {
  fetch('/api/time')
    .then(res => res.json())
    .then(data => console.log(data));
}, []);
