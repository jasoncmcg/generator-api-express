/*
function <%= controllerClassName %>Controller() {
}

function <%= controllerMethod.toLowerCase() %>(req, res, next) {
  res.status(200).json({ hello: 'world' });
}

<%= controllerClassName %>Controller.prototype = {
  <%= controllerMethod.toLowerCase() %>: <%= controllerMethod.toLowerCase() %>
};

var <%= controllerInstanceName %>Controller = new <%= controllerClassName %>Controller();

module.exports = <%= controllerInstanceName %>Controller;
*/

exports.selectItem = function (req, res) {

	//service.selectItem(function (data) {
	//	res.send(data);
	//});

};

exports.selectList = function (req, res) {

	//service.selectList(function (data) {
	//	res.send(data);
	//});

};

exports.insertItem = function (req, res) {

	//var item = req.body.item;

	//service.insertItem(item, function (data) {
	//	res.send(data);
	//});
	
};

exports.updateItem = function (req, res) {

	//var item = req.body.item;
	
	//service.updateItem(item, function (data) {
	//	res.send(data);
	//});

};

exports.deleteItem = function (req, res) {

	//var itemId = req.body.id;
	
	//service.deleteItem(itemId, function (data) {
	//	res.send(data);
	//});

}; 