import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Stack, Box, Text, Button, Spinner } from '@chakra-ui/react';
import TaskForm from './TaskForm';

const Homepage = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchData = () => {
    axios
      .get('http://localhost:8000/tasks')
      .then((response) => {
        const responseData = response.data.tasks;
        setData(responseData);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const StartData = data.filter((item) => item.status === 'Start');
  const ProgressData = data.filter((item) => item.status === 'Progessing');
  const CompletedData = data.filter((item) => item.status === 'Completed');

  const renderTasks = (tasks ) => {
    return tasks.map((task) => (
      <Box
        key={task.id}
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        bg={task.status === 'Start' ? 'yellow.200' : task.status === 'Completed' ? 'blue.200' :'pink.200'}
        mt="4"
      >
        <Text fontSize="lg">{task.name}</Text>
        <Text fontSize="sm">{task.description}</Text>
      </Box>
    ));
    
  };

  const handleAddTask = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <div className="homepage">
      <Container maxW="container.xl" mt="4">
        <Stack direction={['column', 'row']} spacing="24px">
          <Box flex="1">
            <h2>To Start(BackLog)</h2>
            {renderTasks(StartData )}

          </Box>
          <Box flex="1">
            <h2>Progressing (Currently Doing)</h2>
            {renderTasks(ProgressData )}

          </Box>
          <Box flex="1">
            <h2>Completed </h2>
            {renderTasks(CompletedData )}
          </Box>
        </Stack>

        <Box mt="8">
          <Button colorScheme="teal" onClick={handleAddTask}>
            {showForm ? 'Cancel' : 'Add Task'}
          </Button>
          {showForm && <TaskForm fetchData={fetchData} />}
        </Box>

      </Container>
    </div>
  );
};

export default Homepage;
