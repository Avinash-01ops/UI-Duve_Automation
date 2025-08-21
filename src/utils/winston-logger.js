const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

function ensureDirSync(dir) {
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function createWinstonLogger(options = {}) {
	const logsDir = options.logsDir ?? path.join(process.cwd(), 'src', 'test-results', 'logs');
	ensureDirSync(logsDir);
	return createLogger({
		level: options.level ?? 'info',
		format: format.combine(
			format.timestamp(),
			format.printf(({ level, message, timestamp, ...meta }) => {
				const metaJson = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
				return `[${timestamp}] [${level}] ${message}${metaJson}`;
			})
		),
		transports: [
			new transports.Console(),
			new transports.File({ filename: path.join(logsDir, 'winston.log') })
		]
	});
}

module.exports = { createWinstonLogger };

