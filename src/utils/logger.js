const fs = require('fs');
const path = require('path');

function ensureDirSync(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

function timestamp() {
	return new Date().toISOString();
}

function createLogger(options = {}) {
	const enableFile = options.enableFile ?? true;
	const logsDir = options.logsDir ?? path.join(process.cwd(), 'src', 'test-results', 'logs');
	const fileName = options.fileName ?? `log-${Date.now()}.log`;
	const enableDebug = process.env.LOG_DEBUG === '1';
	let filePath = null;

	if (enableFile) {
		ensureDirSync(logsDir);
		filePath = path.join(logsDir, fileName);
	}

	function write(line) {
		// Always echo to console
		// eslint-disable-next-line no-console
		console.log(line);
		if (filePath) {
			try { fs.appendFileSync(filePath, line + '\n'); } catch (_) { /* ignore */ }
		}
	}

	function fmt(level, msg, meta) {
		const base = `[${timestamp()}] [${level}] ${msg}`;
		if (!meta) return base;
		try { return `${base} ${typeof meta === 'string' ? meta : JSON.stringify(meta)}`; } catch (_) { return base; }
	}

	return {
		info: (msg, meta) => write(fmt('INFO', msg, meta)),
		warn: (msg, meta) => write(fmt('WARN', msg, meta)),
		error: (msg, meta) => write(fmt('ERROR', msg, meta)),
		debug: (msg, meta) => {
			if (enableDebug) write(fmt('DEBUG', msg, meta));
		},
		console: (pwMsg) => {
			const type = pwMsg.type();
			const text = pwMsg.text();
			write(fmt(`CONSOLE:${type.toUpperCase()}`, text));
		}
	};
}

module.exports = { createLogger };

