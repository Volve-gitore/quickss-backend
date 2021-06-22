const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {

ac.grant("customer")
  .readAny("hotelResto")    

ac.grant("client")
  .extend("customer")

 .createOwn("group")
 .readOwn("group")
 .updateOwn("group")
 .deleteOwn("group")
 
 .createOwn("category")
 .readOwn("category")
 .updateOwn("category")
 .deleteOwn("category")

 .createOwn("subCategory")
 .readOwn("subCategory")
 .updateOwn("subCategory")
 .deleteOwn("subCategory")

 .createOwn("product")
 .readOwn("product")
 .updateOwn("product")
 .deleteOwn("product") 
 
ac.grant("admin")
 .extend("customer")

 .createAny("hotelResto")
 .updateAny("hotelResto")
 .createAny("role")
 .readAny("role")
 .updateAny("role")
 .deleteAny("role")
 
return ac;
})();