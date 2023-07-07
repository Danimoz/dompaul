'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema } from "@/lib/validations/student";
import { notify } from "@/lib/notify";
import { useState } from "react";

type Students = {
  firstName: string
  lastName: string
  amountOwed: number
  section: 'Primary' | 'Secondary';
  class: 'Kg1' | 'Kg2' | 'Nur1' | 'Nur2' | 'Pry1' | 'Pry2' | 'Pry3' | 'Pry4' | 'Pry5' | 'Pry6' | 'JSS1' | 'JSS2' | 'JSS3';
}

export default function CreateStudents(){
  const {register, handleSubmit, reset, watch, formState: { errors, isSubmitting }, } = useForm<Students>({
    defaultValues: {
      firstName: '',
      lastName: '',
      section: 'Primary',
      amountOwed: 0,
      class: 'Kg1'
    },
    resolver: zodResolver(studentSchema)
  })

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const onSubmit: SubmitHandler<Students> = async(data)=> {
    try {
      const response = await fetch('/api/student', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data })
      })
      if (!response.ok) throw new Error(`Failed to create student: ${response.status} ${response.statusText}`)
      notify({ type:'success', message:'Student Successfully Created' })
      setIsSubmitSuccessful(true)
      reset()
    } catch (error) {
      notify({ type:'error', message:'Could not Create Student at this time' })
    }
  }

  return (
    <div className="mt-8 px-8">
      <h2 className="font-bold text-2xl mb-4 text-center">Add New Student</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-2 font-semibold">First Name</label>
          <input 
            type="text"
            id="firstName"
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-emerald-300 rounded"
            placeholder="First Name"
            {...register('firstName')}
            required
          />
          {errors.firstName?.message && (
            <div className="text-red-500">{errors.firstName?.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-2 font-semibold">Last Name</label>
          <input 
            type="text"
            id="lastName"
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-emerald-300 rounded"
            placeholder="Last Name"
            {...register('lastName')}
            required
          />
          {errors.lastName?.message && (
            <div className="text-red-500">{errors.lastName?.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="amountOwed" className="block mb-2 font-semibold">Amount Owed</label>
          <input 
            type='number'
            id="amountOwed"
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-emerald-300 rounded"
            placeholder="Amount Owed"
            {...register('amountOwed', {valueAsNumber: true})}
            required
          />
          {errors.amountOwed?.message && (
            <div className="text-red-500">{errors.amountOwed?.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="section" className="block mb-2 font-semibold">Section</label>
          <select 
            className="w-full px-4 py-2 border border-emerald-300 rounded"
            {...register('section')}
            disabled={isSubmitting}
            defaultValue='Select Section'
          >
            {
              ['Primary', 'Secondary'].map((section) => (
                <option key={section}>{section}</option>
              ))
            }
          </select>
          {errors.section?.message && (
            <div className="text-red-500">{errors.section?.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="class" className="block mb-2 font-semibold">Class</label>
          <select 
            className="w-full px-4 py-2 border border-emerald-300 rounded"
            {...register('class')}
            disabled={isSubmitting}
            defaultValue='Select Class'
          >
            {
              ['Kg1', 'Kg2', 'Nur1', 'Nur2', 'Pry1', 'Pry2', 'Pry3', 'Pry4', 'Pry5', 'Pry6', 'JSS1', 'JSS2', 'JSS3'].map((studentClass) => (
                <option key={studentClass}>{studentClass}</option>
              ))
            }
          </select>
          {errors.class?.message && (
            <div className="text-red-500">{errors.class?.message}</div>
          )}
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      {
        isSubmitSuccessful &&
          <div className="flex justify-center font-bold text-emerald-500 text-xl">
            Successfully created
          </div>
      }

    </div>
  )
}