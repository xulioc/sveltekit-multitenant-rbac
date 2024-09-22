import pino from 'pino';
import pretty from 'pino-pretty';

const pinoPretty = pretty({
	colorize: true,
	translateTime: 'yyyy-mm-dd HH:MM:ss.l'
});

export const logger = pino(pinoPretty);
