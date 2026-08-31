"use client";
import { useSyncExternalStore } from "react";


let tourActive = false;
const listeners = new Set();


export function setTourActive(value) {
  if (tourActive === value) return;
  tourActive = value;
  listeners.forEach((notify) => notify());
}

function getSnapshot() {
  return tourActive;
}

function getServerSnapshot() {
 
  return false;
}

function subscribe(notify) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}


export function useTourActive() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}