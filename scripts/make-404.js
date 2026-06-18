// After the production build, use the built SPA shell as the GitHub Pages 404
// fallback. GitHub Pages serves 404.html for any path without a prerendered file
// (e.g. /bookings). Making it a copy of index.html boots the Angular app IN PLACE
// at the requested URL — instead of bouncing through "/" (the map app), which
// broke OAuth/magic-link callbacks (/bookings?code=… → bad_oauth_state).
const fs = require('fs');
const path = require('path');

const docs = path.join(__dirname, '..', 'docs');
fs.copyFileSync(path.join(docs, 'index.html'), path.join(docs, '404.html'));
console.log('make-404: docs/404.html ← docs/index.html (SPA fallback boots deep links in place)');
