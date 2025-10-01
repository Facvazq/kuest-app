'use client';

import { QuestionComponentProps } from '@/types';
import TextQuestion from './TextQuestion';
import ParagraphQuestion from './ParagraphQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import RatingQuestion from './RatingQuestion';

export default function QuestionRenderer(props: QuestionComponentProps) {
  const { question } = props;

  switch (question.type) {
    case 'text':
      return <TextQuestion {...props} />;
    case 'paragraph':
      return <ParagraphQuestion {...props} />;
    case 'multiple-choice':
      return <MultipleChoiceQuestion {...props} />;
    case 'checkbox':
      return <CheckboxQuestion {...props} />;
    case 'rating':
      return <RatingQuestion {...props} />;
    default:
      return <div>Unknown question type</div>;
  }
}
