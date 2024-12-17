import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';

    async function initializeDatabase() {
      const db = await open({
        filename: './book_writing_app.db',
        driver: sqlite3.Database,
      });

      await db.exec(`
        CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          synopsis TEXT
        );

        CREATE TABLE IF NOT EXISTS chapters (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          bookId INTEGER,
          title TEXT,
          FOREIGN KEY (bookId) REFERENCES books(id)
        );

        CREATE TABLE IF NOT EXISTS scenes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          chapterId INTEGER,
          content TEXT,
          FOREIGN KEY (chapterId) REFERENCES chapters(id)
        );

        CREATE TABLE IF NOT EXISTS characters (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          bookId INTEGER,
          name TEXT,
          profile TEXT,
          FOREIGN KEY (bookId) REFERENCES books(id)
        );
      `);

      return db;
    }

    const dbPromise = initializeDatabase();

    export async function getBooks() {
      const db = await dbPromise;
      return db.all('SELECT * FROM books');
    }

    export async function getBook(bookId) {
      const db = await dbPromise;
      return db.get('SELECT * FROM books WHERE id = ?', bookId);
    }

    export async function createBook(title, synopsis) {
      const db = await dbPromise;
      const result = await db.run('INSERT INTO books (title, synopsis) VALUES (?, ?)', title, synopsis);
      return result.lastID;
    }

    export async function updateBook(bookId, title, synopsis) {
      const db = await dbPromise;
      return db.run('UPDATE books SET title = ?, synopsis = ? WHERE id = ?', title, synopsis, bookId);
    }

    export async function deleteBook(bookId) {
      const db = await dbPromise;
      return db.run('DELETE FROM books WHERE id = ?', bookId);
    }

    export async function getChapters(bookId) {
      const db = await dbPromise;
      return db.all('SELECT * FROM chapters WHERE bookId = ?', bookId);
    }

    export async function getChapter(chapterId) {
      const db = await dbPromise;
      return db.get('SELECT * FROM chapters WHERE id = ?', chapterId);
    }

    export async function createChapter(bookId, title) {
      const db = await dbPromise;
      const result = await db.run('INSERT INTO chapters (bookId, title) VALUES (?, ?)', bookId, title);
      return result.lastID;
    }

    export async function updateChapter(chapterId, title) {
      const db = await dbPromise;
      return db.run('UPDATE chapters SET title = ? WHERE id = ?', title, chapterId);
    }

    export async function deleteChapter(chapterId) {
      const db = await dbPromise;
      return db.run('DELETE FROM chapters WHERE id = ?', chapterId);
    }

    export async function getScenes(chapterId) {
      const db = await dbPromise;
      return db.all('SELECT * FROM scenes WHERE chapterId = ?', chapterId);
    }

    export async function getScene(sceneId) {
      const db = await dbPromise;
      return db.get('SELECT * FROM scenes WHERE id = ?', sceneId);
    }

    export async function createScene(chapterId, content) {
      const db = await dbPromise;
      const result = await db.run('INSERT INTO scenes (chapterId, content) VALUES (?, ?)', chapterId, content);
      return result.lastID;
    }

    export async function updateScene(sceneId, content) {
      const db = await dbPromise;
      return db.run('UPDATE scenes SET content = ? WHERE id = ?', content, sceneId);
    }

    export async function deleteScene(sceneId) {
      const db = await dbPromise;
      return db.run('DELETE FROM scenes WHERE id = ?', sceneId);
    }

    export async function getCharacters(bookId) {
      const db = await dbPromise;
      return db.all('SELECT * FROM characters WHERE bookId = ?', bookId);
    }

    export async function getCharacter(characterId) {
      const db = await dbPromise;
      return db.get('SELECT * FROM characters WHERE id = ?', characterId);
    }

    export async function createCharacter(bookId, name, profile) {
      const db = await dbPromise;
      const result = await db.run('INSERT INTO characters (bookId, name, profile) VALUES (?, ?, ?)', bookId, name, profile);
      return result.lastID;
    }

    export async function updateCharacter(characterId, name, profile) {
      const db = await dbPromise;
      return db.run('UPDATE characters SET name = ?, profile = ? WHERE id = ?', name, profile, characterId);
    }

    export async function deleteCharacter(characterId) {
      const db = await dbPromise;
      return db.run('DELETE FROM characters WHERE id = ?', characterId);
    }
