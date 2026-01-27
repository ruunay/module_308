# SBA 308: JavaScript Fundamentals - Learner Data Portal

## Project Description
This project is a JavaScript-based data processing script that analyzes learner submissions for an assignment group. It filters data by due dates, validates course IDs, and calculates a final weighted average for each learner while accounting for late submission penalties.

## Key Features
* **Dynamic Calculations:** Calculates individual assignment percentages and overall weighted averages.
* **Error Handling:** Uses `try/catch` blocks to validate that Assignment Groups match their Course IDs and to prevent division by zero errors.
* **Late Penalty Logic:** Automatically deducts 10% of the total points possible if an assignment is submitted after the due date.
* **Date Validation:** Excludes assignments that are not yet due based on the current system date.

## Technologies Used
* JavaScript (ES6)
* Node.js

## How to Run
1. Open your terminal.
2. Navigate to the `Sba` folder.
3. Run the command: `node sba.js`

## Reflection
* **Planning:** Creating helper functions for date checking and penalty calculation early on made the main logic much easier to write.
* **Challenges:** Managing the nested data structure (looping through learners and their specific submissions) was the most complex part of the project.
* **Future Improvements:** In a future version, I would add more robust data type checking to ensure all inputs are converted to Numbers before calculation.