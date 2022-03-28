import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  external_id: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: false
  },
  first_name: {
    type: String,
    unique: false
  },
  family_name: {
    type: String,
    unique: false
  }
})

userSchema.statics.findByExternalId = async function (externalId) {
  const user = await this.findOne({
    external_id: externalId
  })

  return user
}

userSchema.pre('remove', function (next) {
  this.model('Message').deleteMany({ user: this._id }, next)
})

const User = mongoose.model('User', userSchema)

export default User
