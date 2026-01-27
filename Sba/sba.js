/**
 * SBA 308: JavaScript Fundamentals
 * Rayan Ali
 */

// DATA

const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
    { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
    { id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500 } // Future date
  ]
};

const LearnerSubmissions = [
  { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
  { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
  { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
  { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
  { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
];

// TODO: check if points_possible is 0 to avoid division by zero

function validatePoints(points) {
    if(points === 0) {
        throw new Error("Invalid data: points_possible cannot be 0.");
    }
}


// TODO: check if an assignment is actually due yet

function isAssignmentDue(dueAtStr) {
    const now = new Date();
    const dueDate = new Date(dueAtStr);
    return dueDate <= now;
}


// TODO: check if a submission is late and calculate late score

function calculateAdjustedScore(submission, assignment) {
    const dueDate = new Date(assignment.due_at);
    const submissionDate = new Date(submission.submission.submitted_at);
    let score = submission.submission.score;

    if(submissionDate > dueDate) {
        score -= (assignment.points_possible * 0.1); 
    }
       return Math.max(0, score); 
}

function getLearnerData(course, assignmentGroup, submissions) {

    try {
        if (assignmentGroup.course_id !== course.id) {
            throw new Error("Mismatched Course ID: Assignment Group does not belong to this course.");
        } 
    }catch (error) {
        console.error(error.message);
        return [];
    }
    const results = [];
    const learners = {};

    submissions.forEach(submission => {
        const learnerId = submission.learner_id;
        const assignmentId = submission.assignment_id;
        const assignment = assignmentGroup.assignments.find(a => a.id === assignmentId);
        
        if (!assignment || !isAssignmentDue(assignment.due_at)) {
            return;
        }
        try {
            validatePoints(assignment.points_possible);
        } catch (error) {
            console.error(error.message);
            return;
            
        } if (!learners[learnerId]) {
        learners[learnerId] = {
            id: learnerId,
            totalScore: 0,
            totalPossible: 0,
            scores: {}
        };
    }
      const finalScore = calculateAdjustedScore(submission, assignment);
    //   const percentageScore = (finalScore / assignment.points_possible);
      
      learners[learnerId].totalScore += finalScore;
      learners[learnerId].totalPossible += assignment.points_possible;
      learners[learnerId].scores[assignmentId] = finalScore / assignment.points_possible;
    });


    for (const id in learners) {
        const learner = learners[id];
        const avg = learner.totalScore / learner.totalPossible;

        const learnerResult = {
            id: learner.id,
            avg: avg,
            ...learner.scores
        };

        results.push(learnerResult);
    }
     
    return results;
}


console.log("JavaScript is running!");
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log("\n==== SBA 308 Results ====");
console.log(JSON.stringify(result, null, 2));


