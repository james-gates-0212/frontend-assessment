import StudentActions from './studentActions';

interface StateType {
  loading: boolean;
  students: Array<any>;
}


const initialState: StateType = {
  loading: true,
  students: [],
};

function students(state = initialState, { type, payload }) {

  if (type === StudentActions.INIT_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === StudentActions.INIT_SUCCESS) {
    return {
      ...state,
      loading: false,
      students: payload,
    };
  }

  if (type === StudentActions.INIT_ERROR) {
    return {
      ...state,
      loading: false,
      students: [],
    };
  }

  return state;

}

export default students;
