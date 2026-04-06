// Add this to your server.js to clear DNS cache
if (typeof require !== 'undefined' && require.cache) {
  Object.keys(require.cache).forEach(key => {
    delete require.cache[key];
  });
}

// Or set DNS settings in server.js
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS

console.log('DNS servers set to Google DNS');
