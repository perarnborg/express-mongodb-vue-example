export default models => async (req, res, next) => {
  const tokenUser = {
    // TODO: get this from Bearer Token
    externalId: '123456',
    email: 'jane.doe@example.com',
    given_name: 'Jane',
    family_name: 'Doe'
  }
  let user = await models.User.findByExternalId(tokenUser.externalId)
  if (!user) {
    // Create token user in db if it does not exist
    user = models.User({
      external_id: tokenUser.externalId,
      email: tokenUser.email,
      first_name: tokenUser.given_name,
      last_name: tokenUser.family_name
    })
    await user.save()
  }
  req.context = {
    models,
    me: user
  }
  next()
}
