import { TextChannel } from 'discord.js';

import config from '../config';
import client from '../client';

const guild = client.guilds.cache.get(config.get('guild'));
const channel = <TextChannel>guild.channels.cache.get(config.get('channels:role_menus'));

channel.messages.fetch();