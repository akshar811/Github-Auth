const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const app = express();
app.use(session({ secret: "key" }));

passport.use(
  new GitHubStrategy(
    {
      clientID: "0372798f6a4861d8195c",
      clientSecret: "ea27a092bb012d51517595d4bef07370fec7077a",
      callbackURL: "http://localhost:8080/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) =>{
        return done(null, profile)
    }
  )
);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);
app.get("/", (req, res) => {
  res.send("Welcome to the github Developer Community");
});

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
