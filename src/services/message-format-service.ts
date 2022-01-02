import { GuildMember } from 'discord.js'

/**
 * A list of patterns that will be be replaced during formatting.
 */
const PATTERNS = {
  guildName: '{{guild_name}}',
  userName: '{{user_name}}'
}

function formatTemplateString (stringTemplate: string, member: GuildMember): string {
  let formattedString = stringTemplate

  // replace {{guild_name}} with guild.name
  if (stringTemplate.includes(PATTERNS.guildName)) {
    formattedString = formattedString.replaceAll(PATTERNS.guildName, member.guild.name)
  }

  // replace {{user_name}} with a mention of the user
  if (stringTemplate.includes(PATTERNS.userName)) {
    formattedString = formattedString.replaceAll(PATTERNS.userName, `<@${member.id}>`)
  }

  return formattedString
}

export const MessageFormatService = {
  formatTemplateString
}
