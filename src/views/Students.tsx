import { Box, CircularProgress, Divider, Grid, List, ListItem, TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import StudentSelectors from '../modules/student/studentSelectors';
import StudentView from './StudentView';
import Scrollbar from 'react-smooth-scrollbar-z';
import '../styles/scrollbar.css';

function Students() {
  const loading = useSelector(StudentSelectors.selectLoading);
  const students = useSelector(StudentSelectors.selectStudents);

  const [name, setName] = useState('');
  const [tag, setTag] = useState('');

  const filterStudentByNameAndTag = (student) => {
    const filterNameRE = name.toLowerCase();
    const filterTagRE = tag.toLowerCase();
    return (
      (
        name === '' ||
        [
          student.firstName,
          student.lastName
        ].join(' ').toLowerCase().indexOf(filterNameRE) >= 0
      ) &&
      (
        tag === '' ||
        (
          student.tags &&
          student.tags.find((tag) => tag.toLowerCase().indexOf(filterTagRE) >= 0)
        )
      )
    );
  };

  return (
    <>
      <Box px={1} pt={1}>
        <TextField
          label="Search by name"
          variant="standard"
          onChange={(e) => { setName(e.target.value.trim()) }}
          fullWidth
          autoFocus
        />
        <TextField
          label="Search by tag"
          variant="standard"
          onChange={(e) => { setTag(e.target.value.trim()) }}
          fullWidth
        />
      </Box>
      {
        loading ? (
          <Grid container justifyContent="center" py={6}>
            <CircularProgress/>
          </Grid>
        ) : (
          <List sx={{
            height: 'calc(100% - 104px)',
          }}>
            <Scrollbar
              height="100%"
              continuousScrolling
              alwaysShowTracks
            >
              {
                students.filter(filterStudentByNameAndTag).map((student, index) => (
                  <Box key={`student-${student.id}`}>
                    {
                      index > 0 && (
                        <Divider/>
                      )
                    }
                    <ListItem>
                      <StudentView { ...student } />
                    </ListItem>
                  </Box>
                ))
              }
            </Scrollbar>
          </List>
        )
      }
    </>
  );
}

export default Students;
