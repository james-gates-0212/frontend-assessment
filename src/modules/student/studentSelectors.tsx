import { createSelector } from 'reselect';

const selectRaw = (state: any) => state.students;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectStudents = createSelector(
  [selectRaw],
  (raw) => raw.students,
);

const StudentSelectors = {
  selectRaw,
  selectLoading,
  selectStudents,
};

export default StudentSelectors;
