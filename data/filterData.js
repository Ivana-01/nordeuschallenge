const fs = require('fs');

// Funkcija za učitavanje JSONL fajla
const loadEvents = (filePath) => {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const lines = rawData.split('\n');

  // Parsiramo JSON podatke
  const events = lines.map(line => {
    try {
      return JSON.parse(line);
    } catch (e) {
      return null; // Ako linija nije validan JSON, vraćamo null
    }
  }).filter(event => event !== null); // Filtriraj samo validne objekte

  console.log(`Učitano ${events.length} događaja.`);
  return events;
};

// Funkcija za snimanje podataka u JSONL fajl
const saveEventsToFile = (filePath, events) => {
  const eventData = events.map(event => JSON.stringify(event)).join('\n');
  fs.writeFileSync(filePath, eventData);
  console.log(`Događaji su upisani u fajl: ${filePath}`);
};

// Glavni tok rada
const filePath = 'events.jsonl'; // Putanja do tvog originalnog JSONL fajla

// Učitaj sve događaje iz fajla
const events = loadEvents(filePath);

// Provera tipova svih događaja
const types = events.map(event => event.event_type);
console.log(`Tipovi događaja u fajlu: ${[...new Set(types)]}`); // Ispisujemo sve različite tipove

// Razdvajanje događaja po tipu
const registrationEvents = events.filter(event => event.event_type === 'registration');
const sessionEvents = events.filter(event => event.event_type === 'session_ping');
const matchEvents = events.filter(event => event.event_type === 'match');

// Provera broja događaja u svakoj kategoriji
console.log(`Broj događaja za 'registration': ${registrationEvents.length}`);
console.log(`Broj događaja za 'session': ${sessionEvents.length}`);
console.log(`Broj događaja za 'match': ${matchEvents.length}`);

// Snimi događaje u odgovarajuće fajlove
saveEventsToFile('registration.jsonl', registrationEvents);
saveEventsToFile('session.jsonl', sessionEvents);
saveEventsToFile('match.jsonl', matchEvents);

console.log('Događaji su podeljeni u odgovarajuće fajlove.');
