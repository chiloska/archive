var Datastore = require('nedb');
var bycrypt = require('bcrypt');
var db = new Datastore({ filename: 'database/user.db', autoload: true });

var user = {
    deployDB() {
        return db;
    },
    createUser(user, cb) {

        var user = {};

        db.findOne({ email: user.email }, function (err, record) {
            if (err) {
                return cb(err)
            }
            user = record
        })

        if (user.length != 0) {
            return cb('That email address already exists.')
        }
        else {
            bycrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return cb(err)
                }
                bycrypt.hash(user.password, salt, function (err, hash) {
                    if (err) {
                        return cb(err)
                    }
                    user.password = hash

                    db.insert(user, function (err, record) {
                        if (err) {
                            return cb(err)
                        }

                        return cb(null, record)
                    })

                })
            })
        }
    },
    findUserByEmail(email, cb) {
        db.findOne({ 'email': email }, function (err, record) {
            if (err) {
                return cb(err)
            }

            return cb(null, record);
        })
    },
    findUserById(_id, cb) {
        db.findOne({ _id: _id }, function (err, record) {
            if (err) {
                return cb(err)
            }

            return cb(null, record);
        })
    },
    login(user, cb) {
        db.findOne({ 'email': user.email }, function (err, record) {
            if (err) {
                return cb(err)
            }

            if (record == null) {
                return cb('User Not Found');
            }
            else {
                bycrypt.compare(user.password, record.password, function (err, isMatch) {
                    if (err) {
                        return cb(err)
                    }

                    if (isMatch) {
                        var u = {
                            email: record.email,
                            id: record._id
                        }
                        return cb(null, u)
                    }
                    else {
                        return cb(null)
                    }

                })
            }
        })
    }

}

module.exports = user;

