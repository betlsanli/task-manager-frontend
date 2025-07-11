import { useDroppable } from '@dnd-kit/core';
import TaskCard from '../taskcard/TaskCard.js';
import TaskDetails from '../taskDetail/TaskDetail.js'; 
import { Button } from 'antd';
import { useState } from 'react';
import '../Kanban.css';

export function Column({ column, tasks, onUpdateTask, handleDeleteTask }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleSaveTask = (updatedTask) => {
    const now = new Date();

    if (updatedTask.status === 'IN_PROGRESS') {
      updatedTask.startedAt = updatedTask.startedAt || now.toISOString();
      updatedTask.completedAt = null;
    } 
    else if (updatedTask.status === 'DONE') {
      updatedTask.completedAt = updatedTask.completedAt || now.toISOString();
    } 
    else if (updatedTask.status === 'TO_DO') {
      updatedTask.startedAt = null;
      updatedTask.completedAt = null;
    }
    onUpdateTask(updatedTask); // Update task in parent state
    setSelectedTask(null); // Close the modal
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  

  return (
    <div ref={setNodeRef} className="column-container">
      <div className="column-title">
        {column.title}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetails
          visible={!!selectedTask}
          task={selectedTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          handleDeleteTask={handleDeleteTask}
        />
      )}

      <div className="task-cards-container">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDoubleClick={() => handleTaskClick(task)} />
        ))}
      </div>
    </div>
  );
}

export default Column;
