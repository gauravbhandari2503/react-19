import { cva } from 'class-variance-authority';

export const cardVariants = cva('rounded-xl border bg-white shadow-sm dark:bg-slate-900', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});
