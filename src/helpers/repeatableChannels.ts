import { VoiceChannel } from "discord.js";

export function isRepeatableChannel(channel: VoiceChannel): boolean {
    const spaceIndex = channel.name.lastIndexOf(' ');

    if (spaceIndex === -1) {
        return false;
    }

    const id = channel.name.substr(spaceIndex + 1);
    const regex = /^#\d+$/;

    return regex.test(id);
}

export function extractChannelName(channel: VoiceChannel): [string, number] {
    const spaceIndex = channel.name.lastIndexOf(' ');
    const name = channel.name.substr(0, spaceIndex);
    const number = parseInt(channel.name.substr(spaceIndex + 2));

    return [name, number];
}