/*
function <%= serviceClassName %>Service() {
}

function lookup<%= serviceClassName %>(id) {
  return { id: id };
}

<%= serviceClassName %>Service.prototype = {
  lookup<%= serviceClassName %>: lookup<%= serviceClassName %>
};

var <%= serviceInstanceName %>Service = new <%= serviceClassName %>Service();

module.exports = <%= serviceInstanceName %>Service;
*/
var mssql = require("mssql");
var sqlConfig = require("./sqlConfig");

exports.selectItem = function(item, cb) {

	var conn = new mssql.connect(sqlConfig.ssisdb, function(err) {
    if (err) {
      console.log(err);
    }

    var request = new mssql.Request(conn);
	        request.execute('spNameForSelectItem', function(err, recordsets, returnValue) {
            if (err || !recordsets.length) {
                console.log(err);
            } else {
                var items = recordsets[0][0];
                cb(recordItem['']);
            }
        });
	
};

exports.selectList = function(cb) {

  var conn = new mssql.connect(sqlConfig.ssisdb, function(err) {
      if (err) {
          console.log(err);
      }

		var request = new mssql.Request(conn);
		request.execute('spNameForSelectList', function(err, recordsets, returnValue) {
			if (err || !recordsets.length) {
				console.log(err);
			} else {
				var items = recordsets[0];
				cb(items);
			}
		});
  });

};

exports.insertItem = function(item, cb) {

  var conn = new mssql.connect(sqlConfig.ssisdb, function(err) {
    if (err) {
      console.log(err);
    }
    var request = new mssql.Request(conn);
    request.input('Item', mssql.VarChar(128), item);

    request.execute('spNameForInsertItem', function(err, recordsets, returnValue) {
      if (err || !recordsets.length) {
        console.log(err);
      } else {
        var item = recordsets[0][0];
        cb(item['']);
      }
    });
  });

};

exports.updateItem = function(item, cb) {

  var conn = new mssql.connect(sqlConfig.ssisdb, function(err) {
    if (err) {
      console.log(err);
    }
    var request = new mssql.Request(conn);
    request.input('Item', mssql.VarChar(128), item);

    request.execute('spNameForUpdateItem', function(err, recordsets, returnValue) {
      if (err || !recordsets.length) {
        console.log(err);
      } else {
        var item = recordsets[0][0];
        cb(item['']);
      }
    });
  });

};

exports.deleteItem = function(itemId, cb) {

  var conn = new mssql.connect(sqlConfig.ssisdb, function(err) {
    if (err) {
      console.log(err);
    }
    var request = new mssql.Request(conn);
    request.input('ItemId', mssql.VarChar(128), itemId);

    request.execute('spNameForDeleteItem', function(err, recordsets, returnValue) {
      if (err || !recordsets.length) {
        console.log(err);
      } else {
        var item = recordsets[0][0];
        cb(item['']);
      }
    });
  });

};
