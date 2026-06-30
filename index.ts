import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import React from 'react';

export function Card({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return React.createElement('div', { className, ...props }, children as ReactNode);
}

export function Button({ className = '', children, type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return React.createElement('button', { type, className, ...props }, children as ReactNode);
}
