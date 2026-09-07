// Runs the Vercel CLI with scripts/ascii-hostname.cjs preloaded.
// Usage: node scripts/vercel.cjs <vercel args...>
const { spawnSync } = require('child_process');
const path = require('path');

// NODE_OPTIONS uses shell-style quoting and treats backslashes as escapes,
// so the path is passed with forward slashes (Node accepts them on Windows).
const preload = path
  .join(__dirname, 'ascii-hostname.cjs')
  .split(path.sep)
  .join('/');

const env = { ...process.env };
env.NODE_OPTIONS = [env.NODE_OPTIONS, `--require "${preload}"`]
  .filter(Boolean)
  .join(' ');

const result = spawnSync('vercel', process.argv.slice(2), {
  stdio: 'inherit',
  shell: true,
  env,
});

if (result.error) {
  console.error('Failed to run the Vercel CLI. Is it installed? (npm i -g vercel)');
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
