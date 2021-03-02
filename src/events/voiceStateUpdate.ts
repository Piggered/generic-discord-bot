import { VoiceChannel, VoiceState } from 'discord.js';

import { extractChannelName, isRepeatableChannel } from '../helpers/repeatableChannels';

export default async (oldState: VoiceState, newState: VoiceState) => {
    if (oldState.channelID === newState.channelID) {
        return;
    }

    if (oldState.channelID !== null && isRepeatableChannel(oldState.channel)) {
        const [name] = extractChannelName(oldState.channel);

        const allChannels = oldState.guild.channels.cache.filter(c => c.type === 'voice').map(c => <VoiceChannel>c);
        const channels = allChannels.filter(c => isRepeatableChannel(c) && c.name.startsWith(`${name} #`));
        const emptyChannels = channels.filter(c => c.members.array().length === 0);
        const firstEmpty = emptyChannels.map(c => extractChannelName(c)[1]).sort((a, b) => a - b)[0];

        for (const channel of emptyChannels) {
            const [, number] = extractChannelName(channel);

            if (number !== firstEmpty) {
                await channel.delete('Recycling unused repeatable voice channel');
            }
        }
    }

    if (newState.channelID !== null && isRepeatableChannel(newState.channel)) {
        const [name] = extractChannelName(newState.channel);

        const allChannels = newState.guild.channels.cache.filter(c => c.type === 'voice').map(c => <VoiceChannel>c);
        const channels = allChannels.filter(c => isRepeatableChannel(c) && c.name.startsWith(`${name} #`));
        const emptyChannelCount = channels.filter(c => c.members.array().length === 0).length;

        if (emptyChannelCount === 0) {
            let numberToCreate = 2;

            while (channels.find(c => c.name === `${name} #${numberToCreate}`)) {
                numberToCreate++;
            }

            const previousChannel = channels.find(c => c.name === `${name} #${numberToCreate - 1}`);

            const newChannel = await newState.guild.channels.create(`${name} #${numberToCreate}`, {
                reason: 'Creating an instance of repeatable voice channel',
                permissionOverwrites: previousChannel.permissionOverwrites,
                parent: previousChannel.parent,
                type: 'voice'
            });

            await newChannel.setPosition(previousChannel.position + 1);
        }
    }
};