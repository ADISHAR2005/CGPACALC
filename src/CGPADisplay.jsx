import { useState } from 'react';

const CGPADisplay = () => {
  const gradePoints = (mark) => {
    if (mark >= 90) return 10;
    if (mark >= 80) return 9;
    if (mark >= 70) return 8;
    if (mark >= 60) return 7;
    if (mark >= 50) return 6;
    return 0;
  };

  const [subjects, setSubjects] = useState([{ credit: 0, marks: "" }]);
  const [cgpa, setCgpa] = useState(null);

  const addSubject = () => {
    {setSubjects([...subjects, { credit: 0, marks: '' }]);}
  };

  const handleChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleCgpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach((sub) => {
      const gp = gradePoints(sub.marks);
      totalPoints += gp * sub.credit;
      totalCredits += sub.credit;
    });

    const result = totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
    setCgpa(result);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">CGPA Calculator</h2>

      {subjects.map((subject, index) => (
        <div key={index} className="flex items-center gap-4 mb-4">
       
          <select
            className="border border-gray-300 rounded px-3 py-2 w-1/3"
            value={subject.credit}
            onChange={(e) => handleChange(index, 'credit', parseInt(e.target.value))}
          >
            <option value="">Credit</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <input
            type="number"
            min="0"
            max="100"
            placeholder="Marks"
            className="border border-gray-300 rounded px-3 py-2 w-2/3"
            value={subject.marks}
            onChange={(e) => handleChange(index, 'marks', parseInt(e.target.value))}
          />
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          onClick={addSubject}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          ➕ Add Subject
        </button>
        <button
          onClick={handleCgpa}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          🎓 Calculate CGPA
        </button>
      </div>

      {cgpa !== null && (
        <>
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold">
              Your CGPA: <span className="text-green-600">{cgpa}</span>
            </h3>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-bold mb-2">Subject-wise Details</h4>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Subject</th>
                  <th className="border border-gray-300 px-4 py-2">Marks</th>
                  <th className="border border-gray-300 px-4 py-2">Credit</th>
                  <th className="border border-gray-300 px-4 py-2">Grade Point</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">Sub-{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{sub.marks}</td>
                    <td className="border border-gray-300 px-4 py-2">{sub.credit}</td>
                    <td className="border border-gray-300 px-4 py-2">{gradePoints(sub.marks)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CGPADisplay;
