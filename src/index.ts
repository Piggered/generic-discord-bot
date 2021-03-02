import './config';

import client from './client';

import messageReactionAdd from './events/messageReactionAdd';
import voiceStateUpdate from './events/voiceStateUpdate';

client.on('messageReactionAdd', messageReactionAdd);
client.on('voiceStateUpdate', voiceStateUpdate);

client.on('ready', () => {
    require('./helpers/cacheMenuMessages');
});