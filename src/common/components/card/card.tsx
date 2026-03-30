import { type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, memo, useMemo } from 'react';
import { cardVariants } from './card.classes';
import { cn } from '../../utils/cn';

export interface CardProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof cardVariants> {
  title?: string;
  description?: string;
  contentClassName?: string;
}

export const Card = memo(
  ({
    className,
    padding,
    title,
    description,
    contentClassName,
    children,
    ...props
  }: CardProps) => {
    const classes = useMemo(() => cn(cardVariants({ padding }), className), [padding, className]);

    return (
      <div className={classes} {...props}>
        {(title || description) && (
          <div className="mb-4 border-b border-slate-200 pb-3 dark:border-slate-700">
            {title && <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>}
            {description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>}
          </div>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    );
  },
);

Card.displayName = 'Card';
