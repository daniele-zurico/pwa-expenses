import PouchDB from 'pouchdb'
const db = new PouchDB('myExpenses')
const initialiseDb = async () => {
  await db
    .info()
    .then(res => {
      return res
    })
    .catch(err => {
      console.error('db do not exists...')
      return err
    })
}

const saveDocument = async (obj: any) => {
  await db.put(obj)
}

const readDocument = async (docId: string) => {
  return await db.get(docId)
}

export {initialiseDb, saveDocument, readDocument}
