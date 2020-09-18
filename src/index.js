import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './config/passport-setup';
import isLoggedIn from './middlewares/isLoggedIn';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.use(
  cookieSession({
    name: 'playGround',
    keys: ['key1', 'key2'],
  }),
);

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

const PORT = 3000;
app.get('/', (req, res) => {
  res.send('QuicKss app backend!');
});

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${PORT}`);
});

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

// social Logins
app.get('/failed', (req, res) => res.send('You Failed to log in!'));

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) => {
  res.send(`Welcome mr ${req.user.displayName}!`);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@', req.user.name.familyName);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@', req.user.name.givenName);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@', req.user.emails[0].value);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@', req.user.photos[0].value);
});

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), function (
  req,
  res,
) {
  // Successful authentication, redirect home.
  res.redirect('/good');
});

export default app;
