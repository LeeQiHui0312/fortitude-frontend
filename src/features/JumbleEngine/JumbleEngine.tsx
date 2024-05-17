import React, { useState, useEffect } from 'react';

function GameInterface() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameInfo, setGameInfo] = useState<any>(null);
  const [guessWord, setGuessWord] = useState("");
  const [score, setScore] = useState(0);
  const [gamePlayed, setGamePlayed] = useState(0);

  const [error, setError] = useState(null);

  const newGame = () => {
    const apiUrl = 'http://localhost:8080/api/game/new';

    const fetchData = async () => {
      try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('data', data);
          setGameInfo(data);
          setGameStarted(true);
      } catch (error) {
              setError(error);
      }
    };
    fetchData();
    scrollToSection();
  }

  const scrollToSection = () => {
    const section = document.getElementById('jumbleGame');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setGuessWord(value);
  };

  const attemptGame = () => {
    const apiUrl = 'http://localhost:8080/api/game/guess';

    const fetchData = async () => {
      try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: gameInfo?.id,
              word: guessWord
            })
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setGameInfo({...gameInfo, ...data});
          if (data?.result == 'Guessed correctly.' || data?.result == 'All words guessed.') {
            setGameStarted(false);
            setGamePlayed(gamePlayed+1);
            setScore(score+data?.remaining_words);
          }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Stylish Portfolio - Start Bootstrap Template</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossOrigin="anonymous"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css" />
        <link href="././css/styles.css" rel="stylesheet" />
      </head>
      <body id="page-top">
        <header className="masthead d-flex align-items-center">
          <div className="container px-4 px-lg-5 text-center">
              <h1 className="mb-1">Jumble Engine</h1>
              <h3 className="mb-5"><em>A Guessing words game</em></h3>
              {
                !gameStarted ? (
                  <a className="btn btn-primary btn-xl" onClick={newGame}>Start play</a>
                ) : (
                  ''
                )
              }
          </div>
      </header>
        <section className="content-section bg-primary text-white text-center" id="jumbleGame">
          {
            gameStarted ? (
              <div className="container px-12 px-lg-5">
                  <div className="content-section-heading">
                      <h2 className="text-secondary mb-3">{gameInfo?.scramble_word}</h2>
                      <h6 className="mb-5">Remaining words: {gameInfo?.remaining_words}</h6>
                  </div>
                  <div className="row gx-4 gx-lg-5">
                      <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                          <label className="col-sm-6 col-form-label">Guess Word:</label>
                          <div className='mb-3'>
                            <input type="text" id="guessWord" onChange={handleChange} />
                          </div>
                          <button type="button" className="btn btn-secondary" onClick={attemptGame} data-mdb-ripple-init>Attempt</button>
                      </div>
                  </div>
              </div>
            ) : (
              <div className="container px-12 px-lg-5">
                  <div className="content-section-heading">
                  <h2 className="text-secondary mb-3">{gameInfo?.result}</h2>
                  <h6 className="mb-5">Original word: {gameInfo?.original_word}</h6>
                </div>
              </div>
            )
          }
        </section>
        <section className="callout">
            <div className="container px-4 px-lg-5 text-center">
                <h2 className="mx-auto mb-3">
                    Score: 
                    {score}
                </h2>
                <h4 className="mx-auto mb-5">
                    Game played: 
                    {gamePlayed}
                </h4>
            </div>
        </section>
        <footer className="footer text-center">
            <div className="container px-4 px-lg-5">
                <p className="text-muted small mb-0">Developer: Lee Qi Hui</p>
            </div>
        </footer>
        <a className="scroll-to-top rounded" href="#page-top"><i className="fas fa-angle-up"></i></a>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="js/scripts.js"></script>
      </body>    
    </>
  );
}

export default GameInterface;
