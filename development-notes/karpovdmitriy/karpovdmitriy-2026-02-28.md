# Date: 2026-02-28

- **What was done:**

  Work on several things was completed today. Some of them were new to me, and even though they were added without much difficulty, I was doubly interested in figuring out how they work and how to add them to the project.
  So, what exactly was done?
  1. I configured branch protection rules in the repository settings to prevent direct pushes to the default main branch.
     Now, if someone tries to push directly to main branch, they won't be able to do so, and a Git error will appear: "Changes must be made through a pull request." I tested it, and it works.

  2. Added .github/pull_request_template.md to standardize PR descriptions across the team and ensure consistent structure when creating new pull requests.
     An interesting feature is that this template will only be pulled in by GitHub itself when it will be merged in the default branch, which in our case is main. So after I merged these changes into main, the template started working.

  3. Since I'm the team lead, I've traditionally taken on the "Week 2 checkpoint" task - added basic CI pipeline in .github/workflows/ci.yml that runs on push and PR to main and dev branches. The workflow includes ESLint, Stylelint, Prettier format check, TypeScript type checking, and project build. CI worked on the first try and immediately pointed out minor errors from Stylelint. Finally, I checked that the remaining conditions for this task were met.

  4. Since our team decided that I would be developing the backend, we needed to decide on a backend framework. Since this was not quite big project and we wanted to focus specifically on the frontend, we chose a Backend-as-a-Service approach, specifically Supabase or Firebase. After reading several articles online, I realized that Supabase would be best suited for our needs because it's built on PostgreSQL, meaning it's a full-fledged relational database. It allows you to implement custom tables, write SQL queries, and configure relationships (foreign keys). It also has a UI: the so-called Table Editor and SQL Editor. Having worked with real-world databases before, this approach appeals to me more than, for example, Firebase or Appwrite, because their data is stored in collections and documents rather than tables - there are no tables - it's not SQL. A few more important advantages are that it's quite easy to connect to a project and there's a free version, which is exactly what we need.

  5. I also continued watching the React tutorial series. I've completed 14/22 lessons so far.

- **Problems:**
  I wouldn't say it's a problem, but working on the widget trainer and properly preparing for CoreJS Interview #2 takes up quite a bit of my free time. It's also difficult because I have to learn React at the same time.
  I feel a bit tired of the courses, but looking back, I realize I've done a great job that will stay with me for a long time.

- **Solutions (or attempts):**
  Don't tackle everything at once, but break the work down into smaller pieces, decompose tasks, and do everything step by step. Also, maintain a work-life balance.

- **Thoughts / Plans:**
  Start implementing the backend, specifically adding Supabase to the project and, as a first step, adding the tables needed for user registration and authentication (because we already have a frontend ready for this, and once the backend is added, we'll be able to say that one big task has been completed). Next, we need to start thinking through the structure of the tables needed for the proper functioning of the future widget-trainer application. Add an API Service Layer for registration and authentication, as well as for future widget functionality.

- **Time spent:** 12 hours.
