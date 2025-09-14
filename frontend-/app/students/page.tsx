"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Student {
  _id: string
  name: string
  rollNo: string
  department: string
  aggregateCGPA: number
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [filtered, setFiltered] = useState<Student[]>([])
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("all")

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const studentsPerPage = 50

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:" , error);
    }
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/students") // 🔗 Your backend
      .then((res) => res.json())
      .then((data) => {
        setStudents(data)
        setFiltered(data)
      })
  }, [])

  useEffect(() => {
    let result = students

    if (department !== "all") {
      result = result.filter((s) => s.department === department)
    }

    if (search.trim() !== "") {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.rollNo.toLowerCase().includes(search.toLowerCase())
      )
    }

    // sort by aggregate descending
    result = [...result].sort((a, b) => b.aggregateCGPA - a.aggregateCGPA)

    setFiltered(result)
    setCurrentPage(1) // ✅ reset to first page on filter/search change
  }, [search, department, students])

  const departments = Array.from(new Set(students.map((s) => s.department)))

  // ✅ Pagination calculations
  const indexOfLast = currentPage * studentsPerPage
  const indexOfFirst = indexOfLast - studentsPerPage
  const currentStudents = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / studentsPerPage)

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Students</h1>

      {/* Department Tabs */}
      <Tabs defaultValue="all" onValueChange={setDepartment} className="mb-6 text-white flex flex-wrap overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <TabsList className="bg-gray-600">
          <TabsTrigger value="all" className="text-white focus:text-black">All Departments</TabsTrigger>
          {departments.map((dep) => (
            <TabsTrigger className="text-white focus:text-black" key={dep} value={dep}>
              {dep}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="mb-6 flex gap-2">
        <Input
          placeholder="Search by name or roll no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-900 text-white"
        />
        <Button variant="secondary" onClick={() => setSearch("")}>
          Clear
        </Button>
      </div>

      {/* Student Table */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">S.No</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Roll No</TableHead>
                <TableHead className="text-white">Department</TableHead>
                <TableHead className="text-white">Aggregate CGPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStudents.map((student, idx) => (
                <TableRow key={student._id} className="cursor-pointer hover:bg-gray-800">
                  {/* ✅ Serial number (depends on pagination) */}
                  <TableCell className="text-white">
                    {(indexOfFirst + idx + 1).toString()}
                  </TableCell>
                  <TableCell className="text-white">
                    <Link href={`/students/${student._id}`}>
                      <div>
                        <p>{student.name}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-white">{student.rollNo}</TableCell>
                  <TableCell className="text-white">{student.department}</TableCell>
                  <TableCell className="text-white">
                    <p>{student.aggregateCGPA.toFixed(2)}</p>
                    {/* <p className="text-red-500 cursor-pointer" onClick={() => handleDelete(student._id)}>Delete</p> */}
                  </TableCell>
                </TableRow>
              ))}
              {currentStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ✅ Pagination Controls */}
      {filtered.length > studentsPerPage && (
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
