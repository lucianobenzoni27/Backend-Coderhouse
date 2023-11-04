import { Router } from "express";
import passport from 'passport';


const router = Router();

router.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to register' });
      }
      if (!user) {
        return res.status(400).json({ error: 'Failed to register' });
      }
      return res.status(200).json({ message: 'Registration successful' });
    })(req, res, next);
  });

router.get('/failRegister', (req, res) => {
    res.send({ error: 'Failed to register' })
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/failLogin'}), async (req, res) => {
    req.session.user = req.user;
    res.status(200).json({ message: 'Login successful' });
}, (err) => {
    console.error("Error en la autenticación:", err);
    res.status(500).send({ error: 'Error de servidor' });
});

router.get('/failLogin', (req, res) => {
    res.send({ error: 'Failed to login' })
})

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {

}
)

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    console.log('Callback: ', req.user)
    req.session.user = req.user;
    console.log('User session: ', req.session.user)
    res.redirect('/');
})

export default router;