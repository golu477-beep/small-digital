import { spawn } from 'node:child_process';

const backend = spawn('npm', ['--prefix', 'backend', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

const waitForBackend = async () => {
  const url = 'http://localhost:3000/api/projects';
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (response.ok) return true;
    } catch {
     
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return false;
};

const startFrontend = async () => {
  const ready = await waitForBackend();
  if (!ready) {
    console.error('Backend did not become ready on http://localhost:3000');
    backend.kill('SIGTERM');
    process.exit(1);
  }

  const frontend = spawn('npm', ['--prefix', 'frontend', 'run', 'dev'], {
    stdio: 'inherit',
    shell: true,
  });

  const shutdown = () => {
    backend.kill('SIGTERM');
    frontend.kill('SIGTERM');
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

startFrontend();

backend.on('exit', (code) => {
  console.error(`Backend exited with code ${code}`);
  process.exit(code ?? 1);
});
