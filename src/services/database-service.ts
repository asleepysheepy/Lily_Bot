import { Logger } from '../core'
import { createConnection } from 'typeorm'

async function establishConnection (): Promise<void> {
  try {
    await createConnection()
  } catch (error: any) {
    const errorMessage: string = error.toString()
    Logger.error(`An error occured while connecting to the database: ${errorMessage}`)

    process.exit()
  }
}

export const DatabaseService = {
  establishConnection
}
