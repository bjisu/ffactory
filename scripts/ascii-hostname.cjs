// Vercel CLI puts os.hostname() into an HTTP header. A non-ASCII hostname
// (e.g. Korean) makes undici throw:
//   TypeError: Cannot convert argument to a ByteString ...
// Preloaded via --require by scripts/vercel.cjs so the CLI sees an ASCII name.
const os = require('os');

const original = os.hostname;
os.hostname = function hostname() {
  const name = original.call(os);
  return /^[\x20-\x7E]*$/.test(name) ? name : 'ascii-host';
};
