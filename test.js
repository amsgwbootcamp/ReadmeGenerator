const axios = require("axios");

axios
  .get("https://api.github.com/users/JohnDaise/events/public")
  .then(function(res) {
    const email = res.data[0].payload.commits[0].author.email;
  });

