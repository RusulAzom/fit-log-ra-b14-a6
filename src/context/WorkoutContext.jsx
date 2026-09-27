'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'fitlog-state';
export const PLAN_LIMIT = 5;

const WorkoutContext = createContext(null);

export default function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const state = JSON.parse(raw);
        if (Array.isArray(state.plan)) setPlan(state.plan);
        if (Array.isArray(state.saved)) setSaved(state.saved);
        if (Array.isArray(state.completed)) setCompleted(state.completed);
      }
    } catch (error) {
      console.error('Failed to load FitLog state:', error);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved, completed })
      );
    } catch (error) {
      console.error('Failed to save FitLog state:', error);
    }
  }, [plan, saved, completed, hydrated]);

  const addToPlan = (workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast.error('Already in today’s plan');
      return;
    }
    if (plan.length >= PLAN_LIMIT) {
      toast.error('Plan is capped at 5 lifts');
      return;
    }
    setPlan([...plan, workout]);
    toast.success('Added to today’s plan');
  };

  const saveForLater = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error('Already saved for later');
      return;
    }
    setSaved([...saved, workout]);
    toast.success('Saved for later');
  };

  const removeFromPlan = (id) => {
    setPlan(plan.filter((item) => item.id !== id));
    toast.success('Removed from plan');
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
    toast.success('Removed from saved');
  };

  const markAsDone = (id) => {
    const isDone = completed.includes(id);
    setCompleted((prev) =>
      isDone ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
    toast.success(isDone ? 'Marked as not done' : 'Workout marked as done!');
  };

  const value = {
    plan,
    saved,
    completed,
    hydrated,
    addToPlan,
    saveForLater,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
}