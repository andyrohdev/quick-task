'use client';

import { useState } from 'react';
import { Card, Checkbox, Text, TextInput, Group, ActionIcon } from '@mantine/core';
import { IconTrash, IconPencil, IconCheck, IconX } from '@tabler/icons-react';
import { Task } from '../types/Task';
import { cardStyle } from '../styles/theme';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskCardProps {
    task: Task;
    onToggle: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    onEdit: (taskId: string, newTitle: string) => void;
}

export function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const handleSave = () => {
        if (editTitle.trim() === '') return;
        onEdit(task.id, editTitle.trim());
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setIsEditing(false);
    };

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        ...cardStyle,
        cursor: 'grab',
    };


    return (
        <Card
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="glassCard"
            style={style}
        >

            <Group justify="space-between" align="center">
                {isEditing ? (
                    <TextInput
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.currentTarget.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave();
                            if (e.key === 'Escape') handleCancel();
                        }}
                        autoFocus
                    />
                ) : (
                    <Checkbox
                        label={<Text>{task.title}</Text>}
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                    />
                )}

                <Group gap="xs">
                    {isEditing ? (
                        <>
                            <ActionIcon color="green" onClick={handleSave}>
                                <IconCheck size={16} />
                            </ActionIcon>
                            <ActionIcon color="gray" onClick={handleCancel}>
                                <IconX size={16} />
                            </ActionIcon>
                        </>
                    ) : (
                        <>
                            <ActionIcon color="blue" onClick={() => setIsEditing(true)}>
                                <IconPencil size={16} />
                            </ActionIcon>
                            <ActionIcon color="red" onClick={() => onDelete(task.id)}>
                                <IconTrash size={16} />
                            </ActionIcon>
                        </>
                    )}
                </Group>
            </Group>
        </Card>
    );
}
