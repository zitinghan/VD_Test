exports.apiReturnMessage = function (status, data, msg) {
  if (status != 200) {
    msg = "Error: " + msg
  }
  var dataVal = {
    status: status,
    msg: msg,
    data: data
  }
  return dataVal;
}