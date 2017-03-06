import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    parent: {type: String},
    isChild: {type: Boolean}, 
    profile: {
        firstName: { type: String },
        lastName: { type: String },
        companyName: {type: String},
        companyLogo: {type: String},
        phone: {type: String},
        address: { type: String },
        city: { type: String },
        state: { type: String },
        region: { type: String },
        businessType: { type: String },
        profileImage:{type: String},
        cart: {type: Boolean}
    },
    role: {
        type: String,
        enum: ['restaurant', 'supplier', 'supplier-restaurant'],
        default: 'restaurant'
    },
    childRole: {type: String},
    userView: {
        type: String,
        enum: ['restaurant', 'supplier'],
        default: 'restaurant'
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, {
    timestamps: true
});

UserSchema.pre('save', function(next) {
    const user = this,
        SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(passwordAttempt) {
    
    return bcrypt.compareSync(passwordAttempt, this.password);
}


module.exports = mongoose.model('User', UserSchema)
