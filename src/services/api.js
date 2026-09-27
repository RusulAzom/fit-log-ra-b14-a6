const PRIMARY_API = 'https://api.abcz.workers.dev/api/fitlog';
const FALLBACK_API = 'https://api.api-store.workers.dev/api/fitlog';

async function fetchJson(url) {
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }
  return response.json();
}

async function requestWorkouts() {
  try {
    return await fetchJson(PRIMARY_API);
  } catch (error) {
    console.error('Primary API failed, falling back to alternative API:', error);
    return await fetchJson(FALLBACK_API);
  }
}

export async function getAllWorkouts() {
  try {
    const data = await requestWorkouts();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('getAllWorkouts failed:', error);
    return [];
  }
}

export async function getWorkoutById(id) {
  try {
    const data = await requestWorkouts();
    const workouts = Array.isArray(data) ? data : [];
    return workouts.find((workout) => String(workout.id) === String(id)) ?? null;
  } catch (error) {
    console.error('getWorkoutById failed:', error);
    return null;
  }
}