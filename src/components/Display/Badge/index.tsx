import React from 'react';
import { ClassName, className as classes } from '../../utils/main';
import './main.css'

export type BadgeType = 'success' | 'warn' | 'error' | 'info';

type Props = {
    type: BadgeType;
    text: string;
    className?: ClassName;
}

function Badge(props: Props) {
    const { type, text, className } = props

    return <div
        className={
            classes([
                'Badge',
                {
                    'border-success-700 dark:border-success-500 text-success-700 dark:text-success-500': type === 'success',
                    'border-warning-600 dark:border-warning-400 text-warning-600 dark:text-warning-400': type === 'warn',
                    'border-error-600 dark:border-error-400 text-error-600 dark:text-error-400': type === 'error',
                    'border-info-600 dark:border-info-400 text-info-600 dark:text-info-400': type === 'info'
                },
                className
            ])
        }
    >
        {text}
    </div>
}

export default Badge;
