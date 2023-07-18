import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Select, Button } from '@chakra-ui/react';
import axios from 'axios';

const TaskForm = ({ fetchData }) => {
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    status: 'Start', 
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    if (!newTask.name) {
      alert('Please enter a task name.');
      return;
    }

    axios
      .post('http://localhost:8000/tasks', newTask)
      .then((response) => {
        console.log('Task added:', response.data);

        setNewTask({
          name: '',
          description: '',
          status: 'Start', 
        });
        fetchData();
      })

      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" value={newTask.name} onChange={handleInputChange} />
      </FormControl>

      <FormControl id="description" mt="4" isRequired>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="status" mt="4" isRequired>
        <FormLabel>Status</FormLabel>
        <Select name="status" value={newTask.status} onChange={handleInputChange}>
          <option value="Start">Start</option>
          <option value="Progessing">On Progress</option>
          <option value="Completed">Completed</option>
        </Select>
      </FormControl>

      <Button type="submit" colorScheme="teal" mt="4">
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
