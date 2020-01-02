const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const dbName = 'test';
const _datacount = 10000;
const _selectlimit = 10000;
const _updateid = 101;
const type = 'delete'; //insert , drop , selectone ,select , count , update , updateone , deleteone , delete 
// delete one, multiple
// update multiple
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  const db = client.db(dbName);
  switch (type) {
    case 'insert':
      insertDocuments(db, function () {
        client.close();
      });
      break;
    case 'selectone':
      selectOneCollections(db, function () {
        client.close();
      });
      break;
    case 'select':
      selectCollections(db, function () {
        client.close();
      });
      break;
    case 'drop':
      dropCollections(db, function () {
        client.close();
      });
      break;
    case 'updateone':
      updateOneCollections(db, function () {
        client.close();
      });
      break;
    case 'update':
      updateCollections(db, function () {
        client.close();
      });
      break;
    case 'deleteone':
      deleteOneCollections(db, function () {
        client.close();
      });
      break;
    case 'delete':
      deleteCollections(db, function () {
        client.close();
      });
      break;
    case 'count':
      countCollections(db, function () {
        client.close();
      });
      break;
    default:
      break;
  }
});

const insertDocuments = function (db, callback) {
  const collection = db.collection('documents');
  x = [...new Array(_datacount)];
  insert_data = x.map((e, i) => {
    return { sl_no: i, name: `name${i}`, company: `company${i}`, designation: `designation${i}` }
  })
  console.time('insert-time')
  collection.insertMany(insert_data, function (err, result) {
    console.timeEnd('insert-time')
    console.log(`Inserted ${insert_data.length} documents into the collection`);
    callback(result);
  });
}

const dropCollections = function (db, callback) {
  const collection = db.collection('documents');
  console.time('drop-time')
  collection.drop(function (err, delOK) {
    console.timeEnd('drop-time')
    console.log(`Dropped collection`);
    callback(delOK);
  });
}
const selectCollections = function (db, callback) {
  const collection = db.collection('documents');
  console.time('select-time')
  collection.find().limit(_selectlimit).toArray(function (err, res) {
    console.timeEnd('select-time')
    console.log(`Selection completed ${res.length} records`);
    callback(res);
  });
}
const countCollections = function (db, callback) {
  const collection = db.collection('documents');
  console.time('count-time')
  collection.find().count(function (err, res) {
    console.timeEnd('count-time')
    console.log(`Count completed`, res);
    callback(res);
  });
}
const updateOneCollections = function (db, callback) {
  const collection = db.collection('documents');
  console.time('update-multi-time');
  collection.updateOne({ sl_no: _updateid }, { $set: { name: 'sample_name' } }, function (err, res) {
    if (err) return console.log(err);
    console.timeEnd('update-multi-time');
    console.log(`Update completed`, res.result);
    callback(res);
  });
}
const updateCollections = function (db, callback) {
  const collection = db.collection('documents');
  console.time('update-time')
  collection.update({ sl_no: _updateid }, { $set: { name: 'sample_name' } }, { multi: true }, function (err, res) {
    if (err) return console.log(err);
    console.timeEnd('update-time')
    console.log(`Update completed`, res.result);
    callback(res);
  });
}

const selectOneCollections = function (db, callback) {
  const collection = db.collection('documents');
  console.time('select-time')
  collection.find({ sl_no: 9999 }).toArray(function (err, res) {
    console.timeEnd('select-time')
    console.log(`Selection completed ${res.length} records`);
    callback(res);
  });
}

const deleteCollections = function (db, callback) {
  const collection = db.collection('documents');
  console.time('delete-multi-time')
  collection.deleteMany({ sl_no: _updateid }, function (err, res) {
    if (err) return console.log(err);
    console.timeEnd('delete-multi-time')
    console.log(`delete completed`, res.deletedCount);
    callback(res);
  });
}

const deleteOneCollections = function (db, callback) {
  const collection = db.collection('documents');
  console.time('delete-time');
  collection.deleteOne({ sl_no: _updateid }, function (err, res) {
    if (err) return console.log(err);
    console.timeEnd('delete-time');
    console.log(`delete completed`, res.deletedCount);
    callback(res);
  });
}