import StudentService from "./studentService";

const PREFIX = 'STUDENT';

const StudentActions = {

  INIT_STARTED:     `${PREFIX}_INIT_STARTED`,
  INIT_SUCCESS:     `${PREFIX}_INIT_SUCCESS`,
  INIT_ERROR:       `${PREFIX}_INIT_ERROR`,

  doInit: () => async (dispatch) => {
    try {

      dispatch({
        type: StudentActions.INIT_STARTED,
      });

      const students = await StudentService.all();

      dispatch({
        type: StudentActions.INIT_SUCCESS,
        payload: students,
      });
    }
    catch (error) {
      dispatch({
        type: StudentActions.INIT_ERROR,
      })
    }
  },

  toggleExpand: (students, id) => async (dispatch) => {
    dispatch({
      type: StudentActions.INIT_STARTED,
    });
    const student = students.find((student) => student.id === id);
    student.expand = !student.expand;
    dispatch({
      type: StudentActions.INIT_SUCCESS,
      payload: [...students],
    });
  },

  addTag: (students, id, tag) => async (dispatch) => {
    dispatch({
      type: StudentActions.INIT_STARTED,
    });
    const student = students.find((student) => student.id === id);
    if (!student.tags) {
      student.tags = [];
    }
    student.tags.push(tag);
    dispatch({
      type: StudentActions.INIT_SUCCESS,
      payload: students,
    });
  },

};

export default StudentActions;
