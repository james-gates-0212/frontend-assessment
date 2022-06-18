import { Grid, Avatar, Typography, IconButton, TextField, Chip, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import StudentActions from "../modules/student/studentActions";
import StudentSelectors from "../modules/student/studentSelectors";
import { useState } from "react";

function StudentView(student) {

  const dispatch = useDispatch();
  const [expand, setExpand] = useState(student.expand);
  const [tags, setTags] = useState(student.tags || []);
  const students = useSelector(StudentSelectors.selectStudents);

  const toggleExpand = () => {
    setExpand(!expand);
    dispatch(StudentActions.toggleExpand(students, student.id));
  };

  const onTagInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      const tag = e.target.value.trim();
      if (tag === '' || tags.find((t) => t.toLowerCase() === tag.toLowerCase())) {
        return;
      }
      tags.push(tag);
      e.target.value = '';
      setTags([...tags]);
      dispatch(StudentActions.addTag(students, student.id, tag));
    }
  };

  const listTestGrades = (student) => {
    return (
      <>
        <br/><br/>
        {
          student.grades.map((grade, index) => (
            <span key={`grade-${student.id}-${index}`}>
              <span style={{
                display: 'inline-block',
                width: '70px',
              }}>Test{index + 1}:</span>
              <span>{grade}%</span><br/>
            </span>
          ))
        }
      </>
    );
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <Grid container justifyContent="center" py={2}>
          <Avatar src={student.pic} alt={student.firstName + ' ' + student.lastName} sx={{
            width: '100px',
            height: '100px',
            border: '1px solid #ddd',
          }} />
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Grid container justifyContent="space-between">
          <Typography variant="h4" sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}>{student.firstName} {student.lastName}</Typography>
          <IconButton onClick={toggleExpand}>
            {expand ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </Grid>
        <Grid item px={2}>
          <Typography variant="body2" color="#888" pb={1}>
            Email: {student.email}<br/>
            Company: {student.company}<br/>
            Skill: {student.skill}<br/>
            Average: {student.grades.length > 0 ? student.grades.reduce((total, grade) => total = Number.parseInt(total) + Number.parseInt(grade)) / student.grades.length : 0}%
            {expand && listTestGrades(student)}
          </Typography>
          {
            tags.length > 0 && (
              <Stack direction="row" spacing={1}>
                {
                  tags.map((tag) => <Chip key={tag} label={tag} />)
                }
              </Stack>
            )
          }
          <TextField
            variant="standard"
            label="Add a tag"
            size="small"
            onKeyDown={onTagInputKeyDown}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StudentView;
