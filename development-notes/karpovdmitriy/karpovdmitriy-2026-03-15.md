# Date: 2026-03-15

- **What was done:**

Wrote 25 unit tests for the API service layer: for auth and profile functionality. Tested auth functions (login, register, logout, session change listener) and profile functions (get/save profile with snake_case/camelCase mapping). Also covered the error handling helpers that decide whether an error is a user-facing message or a system-level failure. Everything is mocked - no real Supabase calls, just checking that our logic handles success, errors and edge cases correctly.

- **Problems:**

Tried to find all the possible scenarios that need to be covered with unit tests. I feel like there are probably more edge cases I could have covered, but I was running out of time.

- **Solutions (or attempts):**
  I don't think it's a big deal though - I learned how to write unit tests on the frontend and that's what matters most.

- **Thoughts / Plans:**
  I still have an unfinished task on the widget engine, need to try to get it done soon because other people's work depends on it.

- **Time spent:** 20 hours.
