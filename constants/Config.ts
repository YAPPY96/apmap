// constants/Config.ts
// IMPORTANT: Replace this with the base URL of your file server.
// For example: 'https://your-domain.com/path/to/assets'
// Make sure that the JSON files (announcements.json, buildings.json, events.json)
// are accessible at this base URL.
// For example, if your base URL is 'https://koudaisai.com/data', the events file
// should be available at 'https://koudaisai.com/data/events.json'.
const SERVER_BASE_URL = 'https://www.koudaisai.com/admin/wp-content/dataforapp'; // <-- REPLACE THIS

export const Config = {
  SERVER_URL: SERVER_BASE_URL,
  IMAGE_BASE_URL: `${SERVER_BASE_URL}/image`,
  ANNOUNCEMENTS_URL: `${SERVER_BASE_URL}announcements.json`,
  BUILDINGS_URL: `${SERVER_BASE_URL}/buildings.json`,
  EVENTS_URL: `${SERVER_BASE_URL}/events.json`,
  BUILDING_5253_URL: `${SERVER_BASE_URL}/5253.json`,
  STAGE_URL: `${SERVER_BASE_URL}/stage.json`,
  OTHERS_URL: `${SERVER_BASE_URL}/others.json`,
};
