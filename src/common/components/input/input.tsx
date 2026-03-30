import { type VariantProps } from 'class-variance-authority';
import {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import { inputVariants } from './input.classes';

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  debounceMs?: number;
  onValueChange?: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  containerClassName?: string;
  'data-testid'?: string;
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        size,
        state,
        label,
        helperText,
        errorMessage,
        debounceMs = 300,
        onValueChange,
        onDebouncedChange,
        className,
        containerClassName,
        value,
        defaultValue,
        onChange,
        id,
        'data-testid': testId,
        ...props
      },
      ref,
    ) => {
      const isControlled = value !== undefined;
      const [internalValue, setInternalValue] = useState(() =>
        String(value ?? defaultValue ?? ''),
      );
      const isFirstRender = useRef(true);

      useEffect(() => {
        if (!isControlled) return;
        setInternalValue(String(value ?? ''));
      }, [isControlled, value]);

      useEffect(() => {
        if (!onValueChange && !onDebouncedChange) return;

        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }

        const timeoutId = globalThis.setTimeout(() => {
          onValueChange?.(internalValue);
          onDebouncedChange?.(internalValue);
        }, debounceMs);

        return () => {
          globalThis.clearTimeout(timeoutId);
        };
      }, [debounceMs, internalValue, onDebouncedChange, onValueChange]);

      const classes = useMemo(
        () => cn(inputVariants({ size, state: errorMessage ? 'error' : state }), className),
        [size, state, errorMessage, className],
      );

      const message = errorMessage ?? helperText;
      const messageClasses = errorMessage
        ? 'mt-1 text-sm text-error-600 dark:text-error-400'
        : 'mt-1 text-sm text-slate-500 dark:text-slate-400';

      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInternalValue(event.target.value);
        onChange?.(event);
      };

      return (
        <div className={cn('w-full', containerClassName)}>
          {label && (
            <label
              htmlFor={id}
              className="mb-2 block text-base font-medium text-slate-700 dark:text-slate-300"
            >
              {label}
            </label>
          )}

          <input
            ref={ref}
            id={id}
            value={internalValue}
            className={classes}
            onChange={handleChange}
            aria-invalid={errorMessage ? 'true' : undefined}
            data-testid={testId}
            {...props}
          />

          {message && <p className={messageClasses}>{message}</p>}
        </div>
      );
    },
  ),
);

Input.displayName = 'Input';
