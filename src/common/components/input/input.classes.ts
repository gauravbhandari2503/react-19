import { cva } from 'class-variance-authority';
import { formInputBase, inputBorderStyles } from '../../utils/styles';

export const inputVariants = cva(formInputBase, {
  variants: {
    size: {
      small: 'px-1.5 py-0.5 text-sm',
      medium: 'px-2 py-1 text-base',
      large: 'px-3 py-1.5 text-lg',
    },
    state: {
      default: inputBorderStyles.default,
      error: inputBorderStyles.error,
    },
  },
  defaultVariants: {
    size: 'medium',
    state: 'default',
  },
});
