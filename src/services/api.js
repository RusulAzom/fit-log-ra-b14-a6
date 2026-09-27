// Primary endpoint for the FitLog workout library. The alternative endpoint is
// used automatically whenever the primary one throws, errors or times out.
const PRIMARY_API = 'https://api.abcz.workers.dev/api/fitlog';
const FALLBACK_API = 'https://api.api-store.workers.dev/api/fitlog';

// Abandon an endpoint after this long so a stalled request cannot hang the UI.
const REQUEST_TIMEOUT_MS = 8000;

async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        'Request to ' + url + ' failed with status ' + response.status
      );
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function assertWorkoutList(data, source) {
  if (!Array.isArray(data)) {
    throw new Error(source + ' returned an unexpected payload');
  }

  return data;
}

async function requestWorkouts() {
  try {
    const data = await fetchJson(PRIMARY_API);
    return assertWorkoutList(data, 'Primary API');
  } catch (error) {
    console.error('Primary API failed, falling back to alternative API:', error);

    const data = await fetchJson(FALLBACK_API);
    return assertWorkoutList(data, 'Alternative API');
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