import { z } from "zod";

export const studentSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  amountOwed: z.number().min(0, 'Amount owed must be a positive number'),
  section: z.enum(['Primary', 'Secondary'], {required_error: 'Invalid School Section'}),
  class: z.enum(['Kg1', 'Kg2', 'Nur1', 'Nur2', 'Pry1', 'Pry2', 'Pry3', 'Pry4', 'Pry5', 'Pry6', 'JSS1', 'JSS2', 'JSS3'])
})