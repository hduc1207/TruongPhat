async function run() {
  const r = await fetch('https://d26tfxw2msp72q.cloudfront.net/');
  const t = await r.text();
  const chunks = t.match(/_next\/static\/chunks\/[^"]+\.js/g) || [];
  let foundId = false;
  let foundAlert = false;
  for (const c of chunks) {
    const cr = await fetch('https://d26tfxw2msp72q.cloudfront.net/' + c);
    const ct = await cr.text();
    if (ct.includes('1n00iku2aqmicd0ctuq51ijk7b')) foundId = true;
    if (ct.includes('Lỗi khi gọi đăng nhập')) foundAlert = true;
  }
  console.log('Client ID in chunks: ' + foundId);
  console.log('Alert in chunks: ' + foundAlert);
}
run();
