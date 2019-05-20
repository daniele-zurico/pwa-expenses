import PouchDB from 'pouchdb';
const db = new PouchDB('myExpenses');
const initialiseDb = async() => {
    await db.info()
    .then((res) => {
       return res;
    })
    .catch((err) => {
        console.error('db do not exists...');
        return err;
    })
    
}

const saveDocument = (obj: any, option?: any) => {
    db.put(obj, option, (error: any, response: any) => {
        if (error) {
          console.error('Something went wrong when you tried to save the data: ' + error);
          return error;
        } else if(response && response.ok) {
          return response;
        }
    });
}

const readDocument = async(docId: string) => {
    return await db.get(docId).then(res => res);
}

// to remove
const savenote = function() {
    var o = {
        _id: 'expenses',
        expenses: [{
            id: 1,
            name: 'bb',
            amount: 123,
            type: 'income'
        }]
    };

    var o2 = {
        _id: 'history',
        expenses: [{
            id: 2,
            name: 'bb2',
            amount: 153,
            type: 'income'
        }]
    };

    db.put(o, null, function(error: any, response: any) {
      if (error) {
        console.error('Something went wrong when you tried to save the data: ' + error);
        return;
      } else if(response && response.ok) {
        console.info('new data stored: ' + response);

      }
    });
    db.put(o2, null, function(error: any, response: any) {
        if (error) {
          console.error('Something went wrong when you tried to save the data: ' + error);
          return;
        } else if(response && response.ok) {
          console.info('new data stored: ' + response);
  
        }
      });
}

export {db, initialiseDb, saveDocument, readDocument};
