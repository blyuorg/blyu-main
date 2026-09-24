export type IntakeAttachment = {
  name: string;
  type: string;
  blob: Blob;
};

type AttachmentKind = "document" | "voice";

const databaseName = "blyu-project-intake";
const storeName = "attachments";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(storeName)) {
        request.result.createObjectStore(storeName);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore, resolve: (value: T) => void, reject: (error: unknown) => void) => void,
): Promise<T> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, mode);
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => reject(transaction.error);
    action(transaction.objectStore(storeName), resolve, reject);
  });
}

export function saveIntakeAttachment(kind: AttachmentKind, attachment: IntakeAttachment) {
  return withStore<void>("readwrite", (store, resolve, reject) => {
    const request = store.put(attachment, kind);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export function getIntakeAttachment(kind: AttachmentKind) {
  return withStore<IntakeAttachment | undefined>("readonly", (store, resolve, reject) => {
    const request = store.get(kind);
    request.onsuccess = () => resolve(request.result as IntakeAttachment | undefined);
    request.onerror = () => reject(request.error);
  });
}

export function removeIntakeAttachment(kind: AttachmentKind) {
  return withStore<void>("readwrite", (store, resolve, reject) => {
    const request = store.delete(kind);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
