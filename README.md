Endpoints:

/user:
GET - /get/:uuid - get user data
POST - /create - create new user
POST - /update - update user data

/decision:
GET - /get-all/:uuid - get all of a users decisions
POST - /create - create a new decision
POST - /update - update an existing decision

/option:
GET - /get-all/:uuid/:decisionId - get all options for a users specific decision
POST - /create - create a new option for a specific decision
