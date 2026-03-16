# Date: 2026-03-16

## Code Review

- [Feat/add profile page #17](https://github.com/KarpovDmitriy/widget-trainer/pull/17) - 21 comment (
  1. Suggested moving the duplicated email validation regex to a shared utility so it doesn't need to be changed in two places.
  2. Pointed out a non-existent `.socialButtons` CSS class in the markup and suggested removing it.
  3. Recommended moving shared styles (authPage, authMain, authCard) to a common CSS module instead of duplicating them in Login and Register.
  4. Noticed that `.btnPrimary` in Login.module.css was unused since it's already defined in UI.module.css, suggested removing the duplicate.
  5. Found that timezone was displayed in Overview but couldn't be edited in Settings, proposed adding a select field for it.
  6. Suggested replacing hardcoded `white` with `var(--white)` for consistency with the rest of the project.
  7. Found a bug where the form kept unsaved changes after clicking Cancel, recommended adding a form reset.
  8. Spotted inline styles in three places and suggested moving them to CSS files.)

- **What was done:**
  Still working on the widget engine. Studying my weak spots, like React specifics, doing small mini-tasks to better understand things. Figured out unit testing, did a code review for a teammate.
- **Problems:**

It's a bit annoying when you have to switch from the main task to other tasks or even weekly assignments - you lose focus. I just want to write code and stay concentrated on it.

- **Solutions (or attempts):**
  There's no way around these kinds of issues, that's just how development works. To speed things up I sometimes ask AI for help - its advice really helps when you need everything explained step by step.

- **Thoughts / Plans:**
  Need to finish the widget engine, at least a basic version with an example of how it all works on one widget.

- **Time spent:** 8.
