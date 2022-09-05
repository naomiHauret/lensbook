import { cva } from 'class-variance-authority'

export const button = cva(
  [
    'rounded-full inline-flex items-center justify-center',
    'focus:outline-none focus:ring focus:ring-opacity-50',
    'font-sans',
    'transition-colors transition-500',
    'disabled:opacity-50',
  ],
  {
    variants: {
      intent: {
        //@ts-ignore
        primary: ['bg-emerald-500 focus:bg-emerald-700 hover:bg-emerald-400 text-white'],
        'primary-ghost': 'text-emerald-500 bg-transparent: hover:bg-emerald-100 focus:bg-emerald-300',
      },
      aspect: {
        default: 'border-none',
        outline: 'border border-solid',
      },
      scale: {
        xs: ['text-2xs', 'px-3 py-1', 'font-bold'],
        sm: ['text-xs', 'px-3 py-1.5', 'font-bold'],
        default: ['text-xs', 'py-2 px-3', 'font-bold'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      scale: 'default',
      aspect: 'default',
    },
  },
)

export default button
