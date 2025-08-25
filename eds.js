// Challenge 3: Employee Directory Search (Enhanced)

// 1️⃣ Store employees as objects in an array
const employees = [
  {
    name: 'Abraham Belete',
    department: 'HR',
    skills: ['Communication', 'Recruitment'],
  },
  {
    name: 'Birhanu Abegaz',
    department: 'IT',
    skills: ['JavaScript', 'Node.js', 'React'],
  },
  {
    name: 'Seyfu Tadesse',
    department: 'Finance',
    skills: ['Accounting', 'Excel'],
  },
  { name: 'Agegnehu Teshome', department: 'IT', skills: ['Python', 'Django'] },
  {
    name: 'Melese Alemante',
    department: 'CS',
    skills: ['Payroll', 'Recruitment'],
  },
];

// 2️⃣ Function to check if an employee has a skill
const hasSkill = (employee, skill) => employee.skills.includes(skill);

// 3️⃣ Function to search multiple skills using rest operator
const searchSkills = (employee, ...skillsToCheck) =>
  skillsToCheck.every(skill => hasSkill(employee, skill));

// 4️⃣ Add a new skill using spread operator
const addSkill = (employee, newSkill) => ({
  ...employee,
  skills: [...employee.skills, newSkill],
});

// 5️⃣ Function to search employees by multiple departments (rest operator)
const searchDepartments = (employeesArray, ...departments) => {
  return employeesArray.filter(emp => departments.includes(emp.department));
};

// 6️⃣ Display all employees
console.log('\n👥 Employee Directory:');
employees.forEach(emp => {
  const { name, department, skills } = emp; // destructuring
  console.log(
    `Name: ${name}, Department: ${department}, Skills: ${skills.join(', ')}`
  );
});

// 7️⃣ Filter by department example: IT & HR
const itHrEmployees = searchDepartments(employees, 'IT', 'HR');
console.log('\n💼 Employees in IT or HR Departments:');
itHrEmployees.forEach(emp => console.log(emp.name));

// 8️⃣ Employees with JavaScript & React
const jsReactEmployees = employees.filter(emp =>
  searchSkills(emp, 'JavaScript', 'React')
);
console.log('\n🎯 Employees with JavaScript & React:');
jsReactEmployees.forEach(emp => console.log(emp.name));

// 9️⃣ Get all unique skills in the company using reduce
const allSkills = employees.reduce((acc, emp) => {
  for (const skill of emp.skills) {
    if (!acc.includes(skill)) acc.push(skill);
  }
  return acc;
}, []);
console.log('\n🛠 All Unique Skills in the Company:', allSkills);

// 🔟 Leaderboard of employees with most skills
const leaderboard = [...employees].sort(
  (a, b) => b.skills.length - a.skills.length
);
console.log('\n🏆 Employee Leaderboard (Most Skills):');
console.table(
  leaderboard.map(emp => ({
    Name: emp.name,
    Department: emp.department,
    NumberOfSkills: emp.skills.length,
    Skills: emp.skills.join(', '),
  }))
);

// 1️⃣1️⃣ Example: Adding a new skill to an employee without modifying original
const updatedBob = addSkill(employees[1], 'TypeScript');
console.log('\n🆕 Updated Skills for Bob (original object untouched):');
console.log('Original:', employees[1].skills);
console.log('Updated:', updatedBob.skills);

// 1️⃣2️⃣ Display full employee table
console.log('\n📊 Employee Directory Table:');
console.table(
  employees.map(emp => ({
    Name: emp.name,
    Department: emp.department,
    Skills: emp.skills.join(', '),
  }))
);
