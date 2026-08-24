const http = require('http');

const routes = [
  '/',
  '/about',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/refund',
  '/contact',
  '/login',
  '/register',
  '/profile'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3005${route}`, (res) => {
      console.log(`Route http://localhost:3005${route} -> ${res.statusCode} ${res.statusMessage}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.error(`Route http://localhost:3005${route} -> ERROR: ${err.message}`);
      resolve(null);
    });
  });
}

async function main() {
  console.log('Testing routes...');
  for (const r of routes) {
    await checkRoute(r);
  }
}

main();
