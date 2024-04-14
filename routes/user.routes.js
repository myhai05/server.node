
const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');


//auth
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

//user display : 'block'
router.get('/', userController.getAllUsers); //pour aficher les utilisateurs
router.get('/:id', userController.userInfo); //quand l'user se connecte
router.put('/:id', userController.updateUser);//pour les m à js
router.delete('/:id', userController.deleteUser);

module.exports = router;
