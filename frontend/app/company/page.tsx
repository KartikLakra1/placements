"use client";

import { useEffect, useState } from "react";

interface Company {
  _id: string;
  name: string;
  role: string;
  type: string;
  students: string[];
}

export default function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/companies/get")
      .then((res) => res.json())
      .then((data) => {
        const companiesArray = Array.isArray(data)
          ? data
          : data.companies || data.data || [];

        setCompanies(companiesArray);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 px-8 py-10">
      <h1 className="text-3xl font-semibold mb-8">Companies</h1>

      <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {companies.map((company) => (
          <div
            key={company._id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              {company.name}
            </h2>

            <p className="text-sm text-slate-300">
              <span className="font-medium text-slate-400">Role:</span>{" "}
              {company.role}
            </p>

            <p className="text-sm text-slate-300 mb-3">
              <span className="font-medium text-slate-400">Type:</span>{" "}
              {company.type}
            </p>

            <p className="text-sm text-slate-400 mb-2">
              Students: {company.students.length}
            </p>

            <ul className="space-y-1 mt-2">
              {company.students.map((rollNo) => (
                <li key={rollNo}>
                  <a
                    href={`http://localhost:5000/api/students/by-rollno?rollNo=${encodeURIComponent(
                      rollNo
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline transition"
                  >
                    {rollNo}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
