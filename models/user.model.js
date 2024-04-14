const mongoose = require('mongoose');//on appele le module mongoose
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');//bibliothèque pour cypter le mdp

const userSchema = new mongoose.Schema(//on crée une bibliothéque mongoose dans laquelle on va déclarer le schèma utilisateur
  {
    pseudo: {    //les objets
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true//pour éliminer les espaces à la fin
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],// une bibliothèque pour demander une validation
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png" //le cheman pour 
    },
    firstName :{
      required: true,
      type: String,
      max: 1024,
      minlength: 3
    },
    lastName :{
        type: String,
        max: 1024,
      }/*
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }*/
  },
  {
    timestamps: true,//pour savoir à quelle moment l'user a crée son compte
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {//avant d'envoyer le mdp le crypter, avec la bibliothèque bcrypt
  const salt = await bcrypt.genSalt();//genSalt vas generer une chaine pour saler le mdp
  this.password = await bcrypt.hash(this.password, salt);//
  next();//pour passer à la suite
});

userSchema.statics.login = async function(email, password) {//pour décripter le mdp
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema);//pour créer la table user (elle sera crée avec s)

module.exports = UserModel;