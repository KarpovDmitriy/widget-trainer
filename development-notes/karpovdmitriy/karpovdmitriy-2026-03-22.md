# Date: 2026-03-22

- **What was done:**

I've accomplished several interesting things over the past few days. Since the end of the course is approaching, like any self-respecting student, I've started catching up.
I've accumulated several unfinished tasks, all related to mentor reviews.
I recently finished RSS-Puzzle. This task had been pending for a long time, but I finally finished it: I formatted the PR according to the rules and added the necessary functionality for mentor review.
It made me feel a little better.

Then I reviewed PR from my teammate and noticed several interesting details that affected functionality. For example, toasts on some pages were showing keys instead of actual user-friendly messages.
I also saw that styles had been written to smoothly show and hide toasts, but they weren't fully implemented. Ultimately, I pointed out parts of the code that needed to be tweaked to ensure the animation would work as expected.

I've been working on the widget engine for the past week, reworking it several times along the way. First, I created each table for a separate widget type.
Then I realized that since our data is loaded in JSON and Supabase has a special type for working with JSON, it's easiest to create a single, shared table for all widget types.
This will be easy to maintain and extend in the future. If the next developer needs to add a new widget, they can simply add the new widget's data to the shared table.
The key is to mark the widget type in JSON as a special field. I implemented the strategy pattern, and the architecture turned out very nicely, and I didn't encounter any major issues.

I can't say I didn't ask AI about anything, but these were mostly minor details. I plan to have everything ready for a PR tomorrow.

- **Problems:**

I'm a bit short on time because I'm a little ill, and I can't forget about my main work and interview preparation.
Plus, I have some unfinished assignments: mentor reviews, task from courses that need to be completed too. I'm glad the courses will be over soon.
Sometimes I want to have a weekend and do nothing.

- **Thoughts / Plans:**

I need to continue working on the problems above and I need to finish the widget engine and create a PR,
because there's only a week left until the end of the course, I need to have time to do something else besides this and prepare well for the project presentation.

- **Time spent:** 30 hours.
