import bluecloud from '../assets/img/bluecloud.svg';
import pinkcloud from '../assets/img/pinkcloud.svg';
import whitecloud from '../assets/img/whitecloud.svg';
import {useState, useEffect} from 'react';
import {database} from '../services/firebase';

import Confetti from 'react-confetti';

export function Footer() {

    const [blueCounter, setBlueCounter] = useState(0);
    const [blueCounterInPercent, setBlueCounterInPercent] = useState(0);
    const [pinkCounter, setPinkCounter] = useState(0);
    const [pinkCounterInPercent, setPinkCounterInPercent] = useState(0);
    const [totalCounter, setTotalCounter] = useState(0);
    const [animationIsRunning, setAnimationIsRunning] = useState(false);


    useEffect(() => {
        (async () => {
            const votes = database.ref(`votes`);
            await votes.get().then((vote) => {

                const blueVotes = Number(vote.val().blue);
                const pinkVotes = Number(vote.val().pink);
                const totalVotes = Number(blueVotes + pinkVotes);

                setBlueCounter(blueVotes);
                setPinkCounter(pinkVotes);
                setBlueCounterInPercent(Number((blueVotes / totalVotes) * 100));
                setPinkCounterInPercent(Number((pinkVotes / totalVotes) * 100))
                setTotalCounter(totalVotes);
            });
        })()

    }, [])

    const handlerClickVote = async (string: string) => {

        if (string === "pink") {
            localStorage.setItem('@babyrevelation-app/gender', 'PRINCESA');
            setAnimationIsRunning(!animationIsRunning);
            toggleConfetti();
        }
        else if (string === "blue") {
            localStorage.setItem('@babyrevelation-app/gender', 'PRÍNCIPE');
            setAnimationIsRunning(!animationIsRunning);
            toggleConfetti();
        }

        if (localStorage.getItem('@babyrevelation-app/status') === 'true') {
            return false;
        }

        await database.ref(`votes`).set({
            blue: string === "blue" ? blueCounter + 1 : blueCounter,
            pink: string === "pink" ? pinkCounter + 1 : pinkCounter
        }, () => {
            const votes = database.ref('votes');
            votes.on('value', (vote) => {

                setStatusVotedInLocalStorage(string);

                setAnimationIsRunning(true);

                toggleConfetti();

                const blueVotes = Number(vote.val().blue);
                const pinkVotes = Number(vote.val().pink);
                const totalVotes = Number(blueVotes + pinkVotes);

                setBlueCounter(blueVotes);
                setPinkCounter(pinkVotes);
                setBlueCounterInPercent(Number((blueVotes / totalVotes) * 100));
                setPinkCounterInPercent(Number((pinkVotes / totalVotes) * 100))
                setTotalCounter(totalVotes);
            });
        });
    }

    const toggleConfetti = () => {
        setTimeout(() => {
            setAnimationIsRunning(false);
        }, 10000);
    };

    const setStatusVotedInLocalStorage = (gender: string) => {
        localStorage.setItem('@babyrevelation-app/status', 'true');
        localStorage.setItem('@babyrevelation-app/gender', gender === 'blue' ? 'PRÍNCIPE' : 'PRINCESA');
    }

    return (
        <footer>
            <div>
                <p>PRÍNCIPE OU PRINCESA?</p>
                {
                    localStorage.getItem('@babyrevelation-app/status') === 'true'
                        ?
                        <p>O PALPITE QUE VOCÊ ESCOLHEU FOI
                            <span className={localStorage.getItem("@babyrevelation-app/gender") === "PRÍNCIPE" ? "blue" : "pink"}> {localStorage.getItem('@babyrevelation-app/gender')}</span>
                        </p>
                        :
                        <p>TOQUE NA NUVEM CONFORME SEU PALPITE</p>
                }
            </div>
            <div >
                {
                    <Confetti
                        gravity={0.1}
                        className="confetti"
                        run={animationIsRunning}
                        numberOfPieces={100}
                        colors={localStorage.getItem("@babyrevelation-app/gender") === "PRÍNCIPE" ? ["#01c9ea"] : ["#f243ae"]}
                    />
                }
            </div>
            <div className="clouds">
                <div>
                    <span className="blueCounter">{isNaN(blueCounterInPercent) ? 0 : blueCounterInPercent.toFixed(0)} %</span>
                    <img onClick={() => {handlerClickVote("blue")}} className="bluecloud" src={bluecloud} alt="Nuvem Azul" />
                </div>
                <div>
                    <span className="pinkcounter">{isNaN(pinkCounterInPercent) ? 0 : pinkCounterInPercent.toFixed(0)} %</span>
                    <img onClick={() => {handlerClickVote("pink")}} className="pinkcloud" src={pinkcloud} alt="Nuvem Rosa" />
                </div>
                <img className="whitecloud" src={whitecloud} alt="Nuvem Branca" />
            </div>
        </footer>
    )
}