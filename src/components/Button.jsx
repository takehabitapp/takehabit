import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    loading = false,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    // Custom definitions based on CSS variables
    // Since we are using CSS modules/global CSS, we will apply classes that use those vars or inline styles.
    // However, for simplicity and ensuring it works with the provided CSS:

    const variants = {
        primary: {
            backgroundColor: 'transparent',
            color: 'var(--text-main)',
            border: '1px solid var(--text-main)',
            padding: '12px 24px',
            borderRadius: 'var(--radius-md)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '14px',
        },
        accent: {
            backgroundColor: 'transparent',
            color: 'var(--accent)',
            border: '1px solid var(--accent)',
            padding: '12px 24px',
            borderRadius: 'var(--radius-md)',
            fontWeight: '700',
            boxShadow: '0 0 10px rgba(58, 134, 255, 0.3)'
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--text-muted)',
            padding: '8px 16px',
        },
        danger: {
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            color: 'var(--error)',
            border: '1px solid var(--error)',
            padding: '12px 24px',
            borderRadius: 'var(--radius-md)',
        }
    };

    const style = { ...variants[variant], ...props.style };

    // Remove style from props to avoid overwriting
    const { style: _, ...restProps } = props;

    return (
        <button
            className={`${baseStyles} ${className}`}
            style={style}
            disabled={loading || props.disabled}
            {...restProps}
        >
            {loading && <Loader2 className="animate-spin mr-2" size={18} />}
            {children}
        </button>
    );
};

export default Button;
