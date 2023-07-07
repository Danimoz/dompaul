import { studentSchema } from "@/lib/validations/student"
import { db } from "@/lib/db"
import { z } from "zod"

export async function POST(request:Request) {
  try {
    const { data } = await request.json()
    const body = studentSchema.parse(data)

    const existingStudent = await db.student.findFirst({
      where: {
        firstName: body.firstName,
        lastName: body.lastName
      }
    })
    if (existingStudent) return new Response('Student already exists', { status: 400 })

    const student = await db.student.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        amountOwed: body.amountOwed,
        section: body.section,
        class: body.class
      },
      select: {
        id: true
      },
    })

    return new Response(JSON.stringify(student), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    console.log(error)
    return new Response('An error occurred while processing your request', { status: 500 })
  }
}