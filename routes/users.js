var express = require('express');
var router = express.Router();

// GET userlist.
router.get('/userlist', (req, res) => {
    var db = req.db
    var collection = db.get('userlist')
    collection.find({},{}, (e, docs) => {
        res.json(docs)
    })
})

// POST to add user
router.post('/adduser', (req, res) => {
    var db = req.db
    var collection = db.get('userlist')
    collection.insert(req.body, (err, result) => {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        )
    })
})

/* DELETE to deleteuser. */
router.delete('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.id;
  collection.remove({ '_id' : userToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;
