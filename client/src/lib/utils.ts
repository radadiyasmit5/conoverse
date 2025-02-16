import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { create as createStore } from "zustand"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const create = createStore;