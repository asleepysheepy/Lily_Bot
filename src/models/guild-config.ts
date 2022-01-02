import { MaxLength } from '@nestjs/class-validator'
import { Snowflake } from 'discord.js'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseModel } from './base-model'

@Entity()
export class GuildConfig extends BaseModel {
  /**
   * The Discord ID of the guild this configuration object represents.
   */
  @PrimaryColumn({ type: 'varchar' })
  @MaxLength(30)
  id!: Snowflake

  /**
   * The message that should be sent to new users when they join the
   * server.
   *
   * See `MessageFormatService.patterns` for a list of substitution
   * patterns.
   */
  @Column({ name: 'welcome_message', type: 'varchar' })
  welcomeMessage?: string

  /**
   * The ID of the channel where welcome messages should be sent
   */
  @Column({ name: 'welcome_message_channel_id', type: 'varchar' })
  @MaxLength(30)
  welcomeMessageChannelId?: Snowflake

  /**
   * Finds the config object for a given guild id.
   * If no config exists, creates a new one.
   *
   * @param id - The id of the guild
   */
  static async findOrCreate (id: Snowflake): Promise<GuildConfig> {
    let config = await GuildConfig.findOne(id)
    if (config != null) { return config }

    config = new GuildConfig()
    config.id = id
    await config.save()

    return config
  }
}
