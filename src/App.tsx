import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { WORDS } from './app/shared/constants';
import { shuffle } from './app/shared/utils';
import { useStore } from './app/stores/store';
import Footer from './components/Footer';
import Header from './components/Header';
import ResetButton from './components/ResetButton';
import Scores from './components/Scores';
import Word from './components/Word';

const minute = 60;

function App() {
  const { wordStore } = useStore();

  const [time, setTime] = useState(minute);
  const [status, setStatus] = useState<'idle' | 'start' | 'stop' | 'reset'>(
    'idle'
  );
  const [scores, setScores] = useState<Array<number>>([]);

  const interval = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const textPure = text.trim();
    const lastChar = text[text.length - 1];

    if (textPure.length === 0) {
      e.target.value = '';
      wordStore.compareRealTime(textPure);
      return;
    }

    if (lastChar === ' ') {
      wordStore.nextWord(textPure);
      e.target.value = '';
      return;
    }

    wordStore.compareRealTime(textPure);
  };

  const handleReset = () => {
    if (status === 'start') {
      clearInterval(interval.current);
      setStatus('reset');
      return;
    }

    interval.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    setStatus('start');
  };

  useEffect(() => {
    if (['idle', 'stop'].includes(status) && time % minute === 0) {
      wordStore.loadWords(shuffle(WORDS));
      const scoresLocale = localStorage.getItem('scores');
      if (scoresLocale) {
        setScores(JSON.parse(scoresLocale));
      }

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }

    if (time === 0 && status === 'start') {
      clearInterval(interval.current);
      setScores((scores) => {
        const newScores = [...scores, wordStore.score];
        localStorage.setItem('scores', JSON.stringify(newScores));
        return newScores;
      });
      setStatus('stop');
      wordStore.reset();
      setTime(minute);
    }

    if (status === 'reset') {
      clearInterval(interval.current);
      setStatus('idle');
      setTime(minute);
      wordStore.reset();
    }
  }, [status, time]);

  return (
    <div className="bg-blue-400 min-h-screen flex justify-center items-center">
      <div className="container space-y-16">
        <Header />
        <div className="bg-blue-300 text-8xl rounded-lg shadow-lg text-center w-minute py-5 mx-auto w-44">
          {time}
        </div>
        <div className="flex flex-wrap justify-center bg-yellow-200 rounded-lg shadow-lg">
          {wordStore.currentWordList.map((word) => (
            <Word
              isActive={wordStore.currentIndex === word.id}
              key={word.text}
              status={word.status}
              text={word.text}
            />
          ))}
        </div>
        <div className="flex justify-center gap-2">
          <input
            ref={inputRef}
            className="outline-none py-2 px-4 rounded-lg shadow-lg"
            type="text"
            placeholder="Write here!"
            onChange={handleChange}
            disabled={status !== 'start'}
          />
          <ResetButton status={status} handleReset={handleReset} />
        </div>
        <Scores scores={scores} />
        <Footer />
      </div>
    </div>
  );
}

export default observer(App);
