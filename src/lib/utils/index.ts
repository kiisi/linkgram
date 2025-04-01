import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRelativeTime = (timestamp: string | Date): string => {
  // Convert timestamp to Date object if it's a string
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  
  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - date.getTime();
  
  // Convert to seconds
  const diffSec = Math.floor(diffMs / 1000);
  
  // Less than a minute
  if (diffSec < 60) {
    return `${diffSec}s`;
  }
  
  // Less than an hour
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin}m`;
  }
  
  // Less than a day
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return `${diffHours}h`;
  }
  
  // Less than a week
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d`;
  }
  
  // Less than a month (approximately 30 days)
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffDays < 30) {
    return `${diffWeeks}w`;
  }
  
  // Less than a year
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths}mo`;
  }
  
  // One year or more
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears}y`;
};

export const formatTime = (updatedAt: string) => {
  const date = new Date(updatedAt);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};