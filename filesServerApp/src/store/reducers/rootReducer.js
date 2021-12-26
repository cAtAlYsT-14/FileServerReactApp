const initialState = {
  users: [],
  jobDetails: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVERS":
      return { ...state, users: action.data };
    case "ADD_SERVERS":
      return { ...state, users: [action.data, ...state.users] };
    case "DELETE_SERVERS":
      return { ...state, users: [...action.data] }
    case "SET_JOB_DETAILS":
      return { ...state, jobDetails: [...action.data] }
    default:
      return state;
  }
};

export default rootReducer;
