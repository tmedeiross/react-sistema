export const addUserDetails = user => ({
  type: 'ADD_USER',
  payload: { user },
});

export const getUserDetails = text => ({
  type: 'GET_USER_DETAILS',
  payload: { text },
});
