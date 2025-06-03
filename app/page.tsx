'use client';

import { useEffect, useState } from 'react';
import { Container, TextInput, Button, Stack, Group } from '@mantine/core';
import { TaskCard } from '../components/TaskCard';
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';
import { Header } from '../components/Header';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import { motion, AnimatePresence } from 'framer-motion';
import IntroAnimation from '../components/IntroAnimation';
import Footer from '../components/Footer';

// Define initial tasks outside the component with static IDs
const initialTasks: Task[] = [
  {
    id: 'welcome',
    title: 'Welcome to QuickTask, human.',
    completed: false,
  },
  {
    id: 'add-task',
    title: 'Add your first task by typing in the input box above and pressing Enter.',
    completed: false,
  },
  {
    id: 'drag-task',
    title: 'Try dragging tasks to reorder them.',
    completed: false,
  },
];

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [input, setInput] = useState('');
  const [showMainApp, setShowMainApp] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [introEnabled, setIntroEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('introEnabled') !== 'false';
    }
    return true;
  });

  // Add a key to force remounting IntroAnimation when toggling introEnabled
  const [introKey, setIntroKey] = useState(0);

  useEffect(() => {
    // Wait for hydration before using sessionStorage
    const enabled = sessionStorage.getItem('introEnabled') !== 'false';
    const played = sessionStorage.getItem('introPlayed');

    setIntroEnabled(enabled);
    setShowMainApp(!enabled || played === 'true');
    setHydrated(true);
  }, []);

  const handleAddTask = () => {
    if (input.trim() === '') return;

    const newTask: Task = {
      id: uuidv4(),
      title: input,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const handleEditTask = (id: string, newTitle: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over?.id);

      setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  // Handler for toggling the intro animation, to be passed to Footer
  const handleToggleIntro = () => {
    const newValue = !introEnabled;
    setIntroEnabled(newValue);
    sessionStorage.setItem('introEnabled', newValue.toString());

    if (newValue) {
      sessionStorage.removeItem('introPlayed');
      setShowMainApp(false);
      setIntroKey((k) => k + 1); // Force remount
    } else {
      sessionStorage.setItem('introPlayed', 'true');
      setShowMainApp(true);
    }
  };

  if (!hydrated) return null; // Prevent rendering until hydrated

  return (
    <>
      {!showMainApp && (
        <IntroAnimation
          key={introKey}
          onFinish={() => setShowMainApp(true)}
          disabled={!introEnabled}
        />
      )}

      {showMainApp && (
        <>
          <Header />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Container size="sm" py="md">
              <Group mb="md" gap="sm">
                <TextInput
                  placeholder="Add a New Task"
                  value={input}
                  onChange={(e) => setInput(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddTask();
                  }}
                />
                <Button onClick={handleAddTask}>Add Task</Button>
              </Group>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="task-scroll-wrapper">
                    <AnimatePresence mode="wait">
                      {tasks.length === 0 && (
                        <motion.div
                          key="placeholder"
                          className="task-placeholder"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                          Try adding some tasks, human.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="task-scroll-container">
                      <Stack>
                        <AnimatePresence initial={false}>
                          {tasks.map((task) => (
                            <motion.div
                              key={task.id}
                              {...(!isDragging && { layout: true })}
                              initial={{ opacity: 0, scale: 0.9, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 10 }}
                              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            >
                              <TaskCard
                                task={task}
                                onToggle={toggleTask}
                                onDelete={handleDeleteTask}
                                onEdit={handleEditTask}
                              />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </Stack>
                    </div>
                  </div>
                </SortableContext>
              </DndContext>
            </Container>
          </motion.div>
          <Footer introEnabled={introEnabled} onToggleIntro={handleToggleIntro} />
        </>
      )}
    </>
  );
}