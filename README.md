# React Native Course App

This is a React Native application designed to provide an immersive learning experience through various courses. Users can sign up or log in to access the platform, where they can explore a curated list of courses across different subjects. Each course comprises multiple sections, including detailed articles, informative videos, and additional resources, all aimed at providing comprehensive coverage of the topic.

## Features

- User Authentication
  - Login and Sign Up
- View a homepage with list of my courses.
- Find new courses.
- Navigate to detailed course pages.
- Mark sections as complete.
- Take quizzes for each course.
- Track progress for each course individually.
- Reset progress for courses if needed.
  
## Benefits

-Comprehensive Learning: A mix of reading, watching, and testing ensures a well-rounded learning experience.
-Self-Paced: Users can progress through the courses at their own pace, making learning flexible and convenient.
-Interactive Quizzes: Quizzes help reinforce learning and gauge understanding of the material.
-Resource-Rich: Additional links and resources provide opportunities for further exploration beyond the course material.

## Project Structure

- `App.js`:
- `components/`: Contains the various React Native components used in the application.
  - `Login.js`: Login screen for user authentication.
  - `SignUp.js`: Sign-up screen for new users.
  - `CourseList.js`: Displays a list of courses.
  - `TestPage.js`: Displays the quiz for a selected course.
  - `CustomModal.js`: Displays results and options after quiz completion.
- `ProgressContext.js`: Context for managing progress state across the application.
- `courses.json`: JSON file containing details of all courses.
- `CourseDetails.js`: Displays details of a selected course.
- `tests.json`: JSON file containing quiz questions for each course.