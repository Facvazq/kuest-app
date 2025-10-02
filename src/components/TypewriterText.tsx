'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function TypewriterText({ 
  text, 
  speed = 100, 
  delay = 0,
  className = '',
  showCursor = true,
  onComplete
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(delay === 0);

  useEffect(() => {
    // Initial delay before starting to type
    const initialDelayTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(initialDelayTimer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    const typeTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        // Typing completed
        onComplete?.();
      }
    }, speed);

    return () => clearTimeout(typeTimer);
  }, [currentIndex, text, speed, isTyping, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

// Multi-line typewriter component for handling multiple texts
interface MultiTypewriterTextProps {
  texts: string[];
  speed?: number;
  delayBetweenTexts?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export function MultiTypewriterText({ 
  texts, 
  speed = 100, 
  delayBetweenTexts = 1000,
  delay = 0,
  className = '',
  showCursor = true,
  onComplete
}: MultiTypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleTextComplete = () => {
    if (currentTextIndex < texts.length - 1) {
      setTimeout(() => {
        setCurrentTextIndex(currentTextIndex + 1);
      }, delayBetweenTexts);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  };

  return (
    <div>
      {texts.slice(0, currentTextIndex + 1).map((text, index) => (
        <div key={index} className="inline-block">
          {index < currentTextIndex ? (
            // Already typed text
            <span className={className}>{text}</span>
          ) : (
            // Currently typing text
            <TypewriterText
              text={text}
              speed={speed}
              delay={index === 0 ? delay : 0}
              className={className}
              showCursor={showCursor && (index === currentTextIndex)}
              onComplete={handleTextComplete}
            />
          )}
          {index < texts.length - 1 && <br />}
        </div>
      ))}
      {isComplete && showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </div>
  );
}

// Advanced typewriter for handling line-by-line animation with different styles
interface LineByLineTypewriterProps {
  lines: Array<{
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
  }>;
  onComplete?: () => void;
  showCursor?: boolean;
}

export function LineByLineTypewriter({ 
  lines, 
  onComplete,
  showCursor = true 
}: LineByLineTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState(0);

  const handleLineComplete = () => {
    if (currentLineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
      }, 200); // Short delay between lines
    } else {
      setCompletedLines(lines.length);
      onComplete?.();
    }
  };

  return (
    <div>
      {lines.map((line, index) => (
        <div key={index}>
          {index < currentLineIndex ? (
            // Completed line
            <span className={line.className}>{line.text}</span>
          ) : index === currentLineIndex ? (
            // Currently typing line
            <TypewriterText
              text={line.text}
              speed={line.speed || 100}
              delay={line.delay || 0}
              className={line.className || ''}
              showCursor={showCursor && (index === currentLineIndex || index === lines.length - 1)}
              onComplete={handleLineComplete}
            />
          ) : null}
          {index < lines.length - 1 && <br />}
        </div>
      ))}
    </div>
  );
}
