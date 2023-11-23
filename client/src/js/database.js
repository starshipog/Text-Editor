import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });



export const getDb = async (id) => {
  console.log('GET from the database');

  const todosDb = await openDB('todos', 1);

  const tx = todosDb.transaction('todos', 'readonly');

  const store = tx.objectStore('todos');

  const request = store.get(id);

  const result = await request;
  console.log('result.value', result);
  return result;
};


// TODO: Add logic to a method that accepts some content and adds it to the database (DONE)
export const putDb = async (content) => {
  console.log('Add to the database');

  const jateDb = await openDB('jate', 1);
  
  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.add({ jate: content });

  const result = await request;
  console.log('Data saved to the database', result);
};



// TODO: Add logic for a method that gets all the content from the database (DONE)
export const getAllDb = async () => {
  console.log('GET all from the database');

  const jateDb = await openDB('jate', 1);
  
  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};


initdb();