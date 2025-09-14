"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

interface Student {
  _id: string
  name: string
  rollNo: string
  department: string
  aggregateCGPA: number
  semesterCGPA: { semester: number; cgpa: number }[]
}

export default function StudentDetail() {
  const { id } = useParams()
  const [student, setStudent] = useState<Student | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:5000/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
  }, [id])

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      {/* Student Overview */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-400">
            🎓 Student Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-200">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Roll No:</strong> {student.rollNo}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Aggregate CGPA:</strong> 
            <span className="ml-2 text-green-400 font-semibold">{student.aggregateCGPA}</span>
          </p>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-400">
            📈 Semester-wise CGPA Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={student.semesterWiseCGPA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="semester" stroke="#aaa" />
              <YAxis domain={[0, 10]} stroke="#aaa" />
              <Tooltip
                contentStyle={{ backgroundColor: "#111", border: "1px solid #444", borderRadius: "8px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Line type="monotone" dataKey="cgpa" stroke="red" strokeWidth={3} dot={{ r: 5, fill: "#22c55e" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Semester Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {student.semesterWiseCGPA.map((sem) => (
          <Card key={sem.semester} className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-white">Semester {sem.semester}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              {/* Circular meter using Tailwind + relative divs */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#333"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#4ade80"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={2 * Math.PI * 56 * (1 - sem.cgpa / 10)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-lg font-bold text-white">
                  {sem.cgpa.toFixed(1)}
                </span>
              </div>
              <p className="mt-2 text-gray-400">CGPA out of 10</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
