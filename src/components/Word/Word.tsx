import cn from 'classnames';
import styles from './Word.module.css';
import { Props } from './Word.types';

function Word({ status, text, isActive }: Props) {
  const handleClassNames = () => {
    if (isActive) {
      switch (status) {
        case 'correct':
          return 'correct-active';
        case 'incorrect':
          return 'incorrect-active';
        case 'unanswered':
          return 'unanswered-active';
        default:
          return '';
      }
    }

    switch (status) {
      case 'correct':
        return 'correct-inactive';
      case 'incorrect':
        return 'incorrect-inactive';
      case 'unanswered':
        return 'unanswered-inactive';
      default:
        return '';
    }
  };

  return (
    <span className={cn(styles.base, styles[handleClassNames()])}>{text}</span>
  );
}

export default Word;
