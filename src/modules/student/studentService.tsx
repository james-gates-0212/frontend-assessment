import API from '../API';

class StudentService {
  static async all() {
    const response = await API.get(
      '/assessment/students'
    );
    return response.data.students || [];
  }
}

export default StudentService;
