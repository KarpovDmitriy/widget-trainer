import type { RegisteredStrategy } from '../../types';
import { TrueFalseComponent } from './TrueFalseStrategy';

export const trueFalseStrategy: RegisteredStrategy<'true-false'> = {
  type: 'true-false',
  Component: TrueFalseComponent,
};
