// Challenge 1: Student Grades Analysis

// Student data
const students = [
  { name: 'Melese Alemante', scores: { math: 85, english: 78, science: 92 } },
  { name: 'Ayele Abraham', scores: { math: 56, english: 65, science: 70 } },
  { name: 'Mohammed Ali', scores: { math: 90, english: 88, science: 95 } },
  { name: 'Abebeb Kejela', scores: { math: 45, english: 52, science: 48 } },
];

// Function to calculate average using rest operator
const calculateAverage = (...scores) => {
  let total = 0;
  for (const score of scores) {
    total += score;
  }
  return (total / scores.length).toFixed(2);
};

// Create report using a loop
const report = [];
for (const student of students) {
  const { name, scores } = student; // destructuring
  const average = calculateAverage(...Object.values(scores));

  // Using spread operator to create student object with additional info
  report.push({
    ...student,
    Average: parseFloat(average),
    Passed: average >= 60 ? '✅ Yes' : '❌ No',
  });
}

// Display report
console.log('\n📊 Student Grades Report:');
console.table(
  report.map(s => ({
    Name: s.name,
    Math: s.scores.math,
    English: s.scores.english,
    Science: s.scores.science,
    Average: s.Average,
    Passed: s.Passed,
  }))
);

// Calculate class average using loop
let classTotal = 0;
for (const student of report) {
  classTotal += student.Average;
}
const classAverage = (classTotal / report.length).toFixed(2);
console.log('🏫 Class Average:', classAverage);

// Sort students by average to create leaderboard
const leaderboard = [...report];
for (let i = 0; i < leaderboard.length - 1; i++) {
  for (let j = i + 1; j < leaderboard.length; j++) {
    if (leaderboard[j].Average > leaderboard[i].Average) {
      [leaderboard[i], leaderboard[j]] = [leaderboard[j], leaderboard[i]]; // swap
    }
  }
}

// Add rank using a loop
for (let i = 0; i < leaderboard.length; i++) {
  leaderboard[i].Rank = i + 1;
}

// Display leaderboard
console.log('\n🏆 Student Leaderboard:');
console.table(
  leaderboard.map(s => ({
    Rank: s.Rank,
    Name: s.name,
    Average: s.Average,
    Passed: s.Passed,
  }))
);

// Summary using loops
const topPerformer = leaderboard[0];
const lowestPerformer = leaderboard[leaderboard.length - 1];

let passedCount = 0;
for (const student of report) {
  if (student.Passed === '✅ Yes') passedCount++;
}
const passRate = ((passedCount / report.length) * 100).toFixed(1);

console.log('\n🔎 Summary:');
console.log(
  `⭐ Top Performer: ${topPerformer.name} with an average of ${topPerformer.Average}`
);
console.log(
  `⚠️ Lowest Performer: ${lowestPerformer.name} with an average of ${lowestPerformer.Average}`
);
console.log(
  `📈 Pass Rate: ${passedCount}/${report.length} students (${passRate}%) passed`
);
