import { postgresHelper } from "../db/postgres/helper.js"

export class UpdateUserRepository {
  async execute(userId, updateUserParams) {
    const updateFields = []
    const updateValues = []

    Object.keys(updateUserParams).forEach((key) => {
      updateFields.push(`${key} = $${updateValues.length + 1}`)
      updateValues.push(updateUserParams[key])
    })

    updateValues.push(userId)

    const updateQuery = `
      UPDATE users
      SET ${updateFields.join(", ")}
      WHERE id = $${updateValues.length}
      RETURNING *
    `

    const updatedUser = await postgresHelper.query(updateQuery, updateValues)

    return updatedUser[0]
  }
}
