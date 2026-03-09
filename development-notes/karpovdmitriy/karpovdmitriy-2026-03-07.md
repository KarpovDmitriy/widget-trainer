# Date: 2026-03-07

- **What was done:**

I've almost finished the API service layer task for login, register, and profile. I've managed to isolate the UI from the data source. The UI now only knows about the service, not how and where to get the data. I created a table in supabase called user_profiles, added a trigger so that it would fire and create a profile record when a user registers and set default values. I also linked this table to the default auth.users table. I had to use some AI because I spent a long time thinking about how to implement certain things like state or event subscriptions: for example, checking whether a user is already logged in. Another issue was listening to the user's state: if two tabs are open, the second one will know if the user is logged out in the first. The rest I googled, looked at examples online, and tried. I liked this task.

- **Problems:**

I thought I could do it faster, but it didn't work out; the task turned out to be large. I forget to fill out my diary.

- **Solutions (or attempts):**
  I need to start the task right away and not put it off for a while. Although, in reality, there's no time anyway. I need to remember to fill out the diary each day, at least a little.

- **Thoughts / Plans:**
  I need to write a diary for week checkpoint 3 tomorrow, because only tomorrow will there be something to show.

- **Time spent:** 25 hours.
