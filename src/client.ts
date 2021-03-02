import { Client } from 'discord.js';

import config from './config';

const client = new Client();

client.login(config.get('bot_token'));

export default client;