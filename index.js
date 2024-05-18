var request = require("request");
var options = {
  method: "POST",
  // Replace <Room UUID> with the uuid of your room
  url: "https://api.netless.link/v5/tokens/rooms/<Room UUID>",
  headers: {
    token:
      "NETLESSSDK_YWs9c2ZnWVU0VWF5UGxOS3ktWSZleHBpcmVBdD0xNzE2MDM3NjEyMDY3Jm5vbmNlPTE4YzJkNDIwLTE1MTYtMTFlZi1iMzRmLTVmMmMzZjVhNzc5OSZyb2xlPTAmc2lnPTZlMWVlYTZjOGExOTk1MzFiNWFjMzk4NmY4Mjk3N2VjZmZlMjNhY2ZlYjBkYWQyM2JiY2E0ODcyODBmOTNjZDI",
    "Content-Type": "application/json",
    region: "us-sv",
  },
  body: JSON.stringify({ lifespan: 3600000, role: "admin" }),
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
