# Date: 2026-03-01

- **What was done:**

Database design is one continuous reflection. You need to reread all the documentation for the widget trainer project to answer the following questions:

1. What entities will we have?

2. How many tables will the database have?

3. What will be the relationships between the tables?

4. Which tables will be connected to each other?

5. Do I need to create a separate table for each widget type? I'm going to assume so, because I've seen sample JSON files for each widget, and it's logical that they differ from widget to widget. For example, "type" is a common field between widgets that will contain the widget type. However, if you compare a Quiz Widget with a Code Completion Widget, the Quiz Widget (classic multiple-choice test) has a "question" field. The Code Completion Widget (where you need to fill in the blanks in code) doesn't have a question field as such. But it does have "code" - an example of code where you will need to add a part of the code and a "blanks" field that displays a line or two where you'll need to insert the missing code. Another example: the Code Ordering Widget has a "lines" field containing a list of lines that need to be arranged in the correct order to compose the correct section of code. Obviously, other widget types won't have such a field. Since each widget type has its own fields, it's clear that separate tables should be created for each widget type. Ultimately, I decided to create two sets of tables: the first set is for handling user registration and authentication, plus storing data from the profile page. The second set contains four tables for lightweight widgets: Quiz Widget, True/False Widget, Code Completion Widget, and Code Ordering Widget. I'll create the profiles table, as well as the second set of tables, in the next tasks. For now, I'll only create what's needed for user registration and login.

- **Problems:**

1. I wouldn't call this a problem, but rather a feature. I learned that we don't need to create special tables for registration and authorization in Supabase; they come out of the box. There's a dedicated set of methods that allow you to register a user, log in a user, and retrieve a user. This is actually very convenient. Therefore, we'll need to create tables for the profile page and the rest of the ones mentioned above.

2. When creating a user, I encountered an issue with not sending confirmation emails more frequently than 2-3 times per hour.

- **Solutions (or attempts):**
  Soulution for limitation of sending confirmation emails - I had to disable this setting in Supabase, especially since the site isn't in production yet. Successfully created the user. Successfully retrieved the previously created user.

- **Thoughts / Plans:**
  My immediate plans include creating a profile table in the database and implementing a Service Layer API for auth. I plan to create a common .ts file for three logically related parts: registration, authentication, and profiles. Then, connect FE and BE and after that we'll be able to say these modules are fully developed.

- **Time spent:** 6 hours.
