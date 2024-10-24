import Task from '../../components/Task.tsx';
import TaskInput from '../../components/TaskInput.tsx';

function App() {
  return (
			<>
				<TaskInput/>
				<Task 
        title="To study React fundamentals" 
        onComplete={() => console.log('Task complete')}
        onDelete={() => console.log('Task delete')}
      />
			</>
		);
}

export default App
