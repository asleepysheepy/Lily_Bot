import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateGuildConfigTable1640788104294 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const guildConfigTable = new Table({
      name: 'guild_config',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '30',
          isPrimary: true,
          isUnique: true,
          isNullable: false
        },
        {
          name: 'welcome_message',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'welcome_message_channel_id',
          type: 'varchar',
          length: '30',
          isNullable: true
        }
      ]
    })

    await queryRunner.createTable(guildConfigTable, true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('guild_config')
  }
}
