import { MessageReaction, User } from 'discord.js';

import config from '../config';

const menus: RoleMenu[] = config.get('role_menus');

export default async (reaction: MessageReaction, user: User) => {
    if (user.bot) {
        return;
    }

    const menu = menus.find(m => m.message === reaction.message.id);
    const choice = menu?.choices.find(c => c.emoji === reaction.emoji.toString());

    if (!menu || !choice) {
        return;
    }

    const member = reaction.message.guild.members.cache.get(user.id);

    if (!member.roles.cache.has(choice.role)) {
        member.roles.add(choice.role, 'Reaction role toggle');
    } else {
        member.roles.remove(choice.role, 'Reaction role toggle');
    }

    reaction.users.remove(member.id);
};