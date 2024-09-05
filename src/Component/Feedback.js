import React, { useState } from 'react';

const questions = [
  "How satisfied are you with our service?",
  "How would you rate the quality of our product?",
  "How likely are you to recommend us to a friend?",
  "How would you rate our customer support?",
  "How would you rate your favorite coordinator?"
];

const emojiMap = {
  5: "😄", // Very satisfied
  4: "😊", // Satisfied
  3: "😐", // Neutral
  2: "😕", // Unsatisfied
  1: "😡", // Very unsatisfied
  default: "🤔" // Default emoji when no input is given
};

const Feedback = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [ratings, setRatings] = useState(Array(questions.length).fill(null));
  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorRating, setCoordinatorRating] = useState(null);

  // Handles rating change for each question
  const handleRatingChange = (questionIndex, ratingValue) => {
    const updatedRatings = [...ratings];
    updatedRatings[questionIndex] = ratingValue;
    setRatings(updatedRatings);
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitFeedback = async () => {
    // Retrieve data from localStorage
    const teamName = localStorage.getItem('teamName') || 'Unknown';
    const username = localStorage.getItem('userName') || 'Anonymous'; // Use 'userName' instead of 'username'
    const email = localStorage.getItem('email') || 'No Email';

    const feedbackData = {
      ratings,
      coordinatorName,
      coordinatorRating,
      teamName,
      username,
      email
    };
    console.log("Submitting feedback data:", feedbackData);
    try {
      const response = await fetch('https://feedserver.vercel.app/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const currentEmoji = ratings[currentQuestion] ? emojiMap[ratings[currentQuestion]] : emojiMap.default;

  return (
    <div className="App">
      <header className="hero-section">
        <h1 className="heading">Tekathon 3.0</h1>
        <p className="subheading">Internal hackathon for SIH 2024</p>
      </header>
      <center>
        <div className="content-container">
          <div className="question-container">
            <div className="feedback-section">
              <h2>Please leave your feedback</h2>
              <div className="feed">
                {currentQuestion < questions.length - 1 ? (
                  <>
                    <div>{questions[currentQuestion]}</div>
                    <div className="rating">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <React.Fragment key={star}>
                          <input
                            type="radio"
                            id={`star${star}-${currentQuestion}`}
                            name={`rating-${currentQuestion}`}
                            value={star}
                            checked={ratings[currentQuestion] === `${star}`}
                            onChange={() => handleRatingChange(currentQuestion, `${star}`)}
                          />
                          <label htmlFor={`star${star}-${currentQuestion}`}></label>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="coordinatorName">Who is your favorite coordinator?</label>
                      <input
                        type="text"
                        id="coordinatorName"
                        value={coordinatorName}
                        onChange={(e) => setCoordinatorName(e.target.value)}
                        placeholder="Enter coordinator's full name"
                      />
                      <div className="rating">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <React.Fragment key={star}>
                            <input
                              type="radio"
                              id={`coordinatorRating-${star}`}
                              name="coordinator-rating"
                              value={star}
                              checked={coordinatorRating === `${star}`}
                              onChange={() => setCoordinatorRating(`${star}`)}
                            />
                            <label htmlFor={`coordinatorRating-${star}`}></label>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <div className="navigation-buttons">
                  <button className='pre' onClick={handlePrevious} disabled={currentQuestion === 0}>
                    <img src='pre.png' className='image'/>
                  </button>
                  {currentQuestion < questions.length - 1 || (coordinatorName === '' && currentQuestion === questions.length - 1) ? (
                    <button className='next' onClick={handleNext} disabled={coordinatorName.length < 2 && currentQuestion === questions.length - 1}>
                      <img src='next.png' className='image'/>
                    </button>
                  ) : (
                    <button className='submit' onClick={handleSubmitFeedback} disabled={!coordinatorRating}>
                      Submit Feedback
                    </button>
                  )}
                </div>
                <div className="emogicontainer">{currentEmoji}</div>
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Feedback;
