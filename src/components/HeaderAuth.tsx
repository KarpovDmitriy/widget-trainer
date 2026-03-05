const HeaderAuth: React.FC = () => {
  return (
    <div className="auth-aside">
      <h1>Widget Trainer</h1>
      <div className="auth-aside-content">
        <h2>Interactive Trainer for Developers</h2>
        <p className="auth-aside-description">
          A modern educational platform that transforms complex programming concepts into an engaging gaming
          experience.The application offers a deep dive into complex concepts through a series of visual tasks and
          specialized mini-games.
        </p>

        <ul className="auth-aside-features">
          <li>
            <strong>Interactive Mini-Games:</strong>
            Master Call Stack, Event Loop, and Memory Management.
          </li>
          <li>
            <strong>Diverse Formats:</strong>
            From classic quizzes to "Fill in the Blanks" code challenges.
          </li>
          <li>
            <strong>Progress Tracking:</strong>
            Analyze your growth with detailed session history.
          </li>
        </ul>
      </div>
      <div className="auth-aside-footer">
        <span>Deep dive into coding with visual tasks and gamified learning.</span>
      </div>
    </div>
  );
};
export default HeaderAuth;
