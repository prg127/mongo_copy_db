var MongoClient = require('mongodb').MongoClient;

var url1 = "mongodb://localhost:27017/database1";

var url2 =  "mongodb://localhost:27017/database2";


MongoClient.connect(url1,function(err,db){
  if(err)
  {
      console.log(err);
  }
  else
  {
      console.log("database1 created");
  }
  db.close();
  });


  MongoClient.connect(url2,function(err,db){

    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("database2 create");
    }
    db.close();
    });



MongoClient.connect(url1, function(err, db) {
    if (err)
    {
        console.log(err);
    }
    var dbo = db.db("database1");
    dbo.createCollection("1st", function(err, res) {
      if (err) throw err;
      console.log("Collection first  created!");
      db.close();
    });
  });


  MongoClient.connect(url2, function(err, db) {
    if (err)
    {
        console.log(err);
    }
    var dbo = db.db("database2");
    dbo.createCollection("2nd", function(err, res) {
      if (err) throw err;
      console.log("Collection second created!");
      db.close();
    });
  });


  MongoClient.connect(url1, function(err, db) {
    if (err) throw err;function copyCollection(source, target, collectionName, cb) {
        source.collection(collectionName, function(err1, sourceCollection) {
            if (err1) {
                console.error("error opening source collection");
                cb(err1);
            }
            else {
                target.collection(collectionName, function(err2, targetCollection) {
                    if (err2) {
                        console.error("error opening target collection");
                        cb(err2);
                    }
                    else {
                        // Note: if this fails it's because I was lazy and used toArray
                        // try .each() and insert one doc at a time? (do a count() first so you know it's done)
                        sourceCollection.find().toArray(function(err3, results) {
                            if (err3) {
                                console.error("error finding source results");
                                cb(err3);
                            }
                            else {
                                targetCollection.insert(results, { safe: true }, function(err4, docs) {
                                    if (err4) {
                                        console.error("error inserting target results");
                                        cb(err4);
                                    }
                                    else {
                                        cb(null, docs.length + " docs inserted");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    var dbo = db.db("database1");
    var myobj = { name: "Pranav Goyal", address: "Noida" };
    dbo.collection("first").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted in first collection");
      db.close();
    });
  });



  MongoClient.connect(url2, function(err, db) {
    if (err) throw err;
    var dbo = db.db("database2");
    var myobj = { name: "AJAY", address: "Punjab" };
    dbo.collection("second").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted in second collection");
      db.close();
    });
  });
  function copyCollection(source, target, collectionName, cb) {
      source.collection(collectionName, function(err1, sourceCollection) {
          if (err1) {
              console.error("error opening source collection");
              cb(err1);
          }
          else {
              target.collection(collectionName, function(err2, targetCollection) {
                  if (err2) {
                      console.error("error opening target collection");
                      cb(err2);
                  }
                  else {
                      // Note: if this fails it's because I was lazy and used toArray
                      // try .each() and insert one doc at a time? (do a count() first so you know it's done)
                      sourceCollection.find().toArray(function(err3, results) {
                          if (err3) {
                              console.error("error finding source results");
                              cb(err3);
                          }
                          else {
                              targetCollection.insert(results, { safe: true }, function(err4, docs) {
                                  if (err4) {
                                      console.error("error inserting target results");
                                      cb(err4);
                                  }
                                  else {
                                      cb(null, docs.length + " docs inserted");
                                  }
                              });
                          }
                      });
                  }
              });
          }
      });
  }
