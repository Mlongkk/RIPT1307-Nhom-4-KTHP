import React, { useEffect, useMemo, useState } from 'react';
import {
    Button, Input, Select, DatePicker, Table, Form,
    Card, Row, Col, Statistic, Modal
} from 'antd';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Task {
    id: string;
    title: string;
    assignee: string;
    priority: 'Low' | 'Medium' | 'High';
    deadline: string;
    status: 'Todo' | 'In Progress' | 'Done';
}

// ===== STORAGE =====
const getTasks = (): Task[] => JSON.parse(localStorage.getItem('tasks') || '[]');
const saveTasks = (tasks: Task[]) => localStorage.setItem('tasks', JSON.stringify(tasks));

const getUsers = (): string[] => JSON.parse(localStorage.getItem('users') || '[]');
const saveUsers = (users: string[]) => localStorage.setItem('users', JSON.stringify(users));

const normalize = (str: string) => str?.trim().toLowerCase();

const App: React.FC = () => {
    const [user, setUser] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [keyword, setKeyword] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>();
    const [filterUser, setFilterUser] = useState<string>();
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (u) setUser(u);
        setTasks(getTasks());

        const storedUsers = getUsers();
        if (storedUsers.length === 0) {
            const defaultUsers = ['admin', 'alice', 'bob'];
            saveUsers(defaultUsers);
            setUsers(defaultUsers);
        } else {
            setUsers(storedUsers);
        }
    }, []);

    useEffect(() => saveTasks(tasks), [tasks]);
    useEffect(() => saveUsers(users), [users]);

    const login = (name: string) => {
        const clean = normalize(name);
        localStorage.setItem('user', clean);
        setUser(clean);

        if (!users.includes(clean)) {
            setUsers(prev => [...prev, clean]);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const addTask = (values: any) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: values.title,
            assignee: values.assignee,
            priority: values.priority,
            deadline: values.deadline.format('YYYY-MM-DD'),
            status: values.status,
        };

        if (!users.includes(values.assignee)) {
            setUsers(prev => [...prev, values.assignee]);
        }

        setTasks(prev => [...prev, newTask]);
        form.resetFields();
    };

    const updateTask = (values: any) => {
        setTasks(prev => prev.map(t =>
            t.id === editingTask?.id
                ? { ...t, ...values, deadline: values.deadline.format('YYYY-MM-DD') }
                : t
        ));
        setEditingTask(null);
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const updateStatus = (id: string, status: Task['status']) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    };

    // ===== FILTER FIX =====
    const filtered = useMemo(() => {
        return tasks.filter(t => {
            return (
                (!keyword || normalize(t.title).includes(normalize(keyword))) &&
                (!filterStatus || t.status === filterStatus) &&
                (!filterUser || normalize(t.assignee).includes(normalize(filterUser)))
            );
        });
    }, [tasks, keyword, filterStatus, filterUser]);

    const myTasks = tasks.filter(t => normalize(t.assignee) === normalize(user || ''));

    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'Done').length;

    const events = tasks.map(t => ({
        ...t,
        title: t.title,
        start: new Date(t.deadline),
        end: new Date(t.deadline),
    }));

    if (!user) {
        return (
            <div style={{ padding: 40 }}>
                <Input.Search placeholder="Enter username" enterButton="Login" onSearch={login} />
            </div>
        );
    }

    const columns = [
        { title: 'Title', dataIndex: 'title' },
        { title: 'Assignee', dataIndex: 'assignee' },
        { title: 'Priority', dataIndex: 'priority' },
        { title: 'Deadline', dataIndex: 'deadline' },
        {
            title: 'Status',
            render: (_: any, record: Task) => (
                <Select value={record.status} onChange={(v) => updateStatus(record.id, v)}>
                    <Select.Option value="Todo">Todo</Select.Option>
                    <Select.Option value="In Progress">In Progress</Select.Option>
                    <Select.Option value="Done">Done</Select.Option>
                </Select>
            ),
        },
        {
            title: 'Action',
            render: (_: any, record: Task) => (
                <>
                    <Button onClick={() => {
                        setEditingTask(record);
                        editForm.setFieldsValue({ ...record, deadline: moment(record.deadline) });
                    }}>Edit</Button>
                    <Button danger onClick={() => deleteTask(record.id)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <Row justify="space-between">
                <h2>Welcome, {user}</h2>
                <Button onClick={logout}>Logout</Button>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Add Task">
                        <Form form={form} layout="vertical" onFinish={addTask}>
                            <Form.Item name="title" rules={[{ required: true }]}>
                                <Input placeholder="Title" />
                            </Form.Item>
                            <Form.Item name="assignee" rules={[{ required: true }]}>
                                <Select placeholder="Người được giao">
                                    {users.map(u => (
                                        <Select.Option key={u} value={u}>{u}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="priority" rules={[{ required: true }]}>
                                <Select placeholder="Priority">
                                    <Select.Option value="Low">Low</Select.Option>
                                    <Select.Option value="Medium">Medium</Select.Option>
                                    <Select.Option value="High">High</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="deadline" rules={[{ required: true }]}>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item name="status" rules={[{ required: true }]}>
                                <Select placeholder="Status">
                                    <Select.Option value="Todo">Todo</Select.Option>
                                    <Select.Option value="In Progress">In Progress</Select.Option>
                                    <Select.Option value="Done">Done</Select.Option>
                                </Select>
                            </Form.Item>
                            <Button type="primary" htmlType="submit" block>Add</Button>
                        </Form>
                    </Card>
                </Col>

                <Col span={16}>
                    <Card title="Filters">
                        <Row gutter={8}>
                            <Col>
                                <Input placeholder="Search" onChange={e => setKeyword(e.target.value)} />
                            </Col>
                            <Col>
                                <Select allowClear placeholder="Status" onChange={setFilterStatus}>
                                    <Select.Option value="Todo">Todo</Select.Option>
                                    <Select.Option value="In Progress">In Progress</Select.Option>
                                    <Select.Option value="Done">Done</Select.Option>
                                </Select>
                            </Col>
                            <Col>
                                <Input placeholder="User" onChange={e => setFilterUser(e.target.value)} />
                            </Col>
                        </Row>

                        <Card title="Task List" style={{ marginTop: 16 }}>
                            <Table rowKey="id" dataSource={filtered} columns={columns} />
                        </Card>
                    </Card>


                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={12}>
                    <Card title="Công việc được giao cho tôi">
                        {myTasks.length === 0 ? 'No task' : myTasks.map(t => (
                            <p key={t.id}>{t.title} - {t.status}</p>
                        ))}
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="Statistics">
                        <Statistic title="Total Tasks" value={total} />
                        <Statistic title="Completed" value={done} />
                    </Card>
                </Col>
            </Row>

            <Card title="Calendar" style={{ marginTop: 20 }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 400 }}
                    onSelectEvent={(event: any) => {
                        alert(`${event.title}\nAssignee: ${event.assignee}\nStatus: ${event.status}`);
                    }}
                />
            </Card>

            <Modal
                title="Edit Task"
                visible={!!editingTask}
                onCancel={() => setEditingTask(null)}
                onOk={() => editForm.submit()}
            >
                <Form form={editForm} layout="vertical" onFinish={updateTask}>
                    <Form.Item name="title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="assignee" rules={[{ required: true }]}>
                        <Select>
                            {users.map(u => (
                                <Select.Option key={u} value={u}>{u}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="priority">
                        <Select>
                            <Select.Option value="Low">Low</Select.Option>
                            <Select.Option value="Medium">Medium</Select.Option>
                            <Select.Option value="High">High</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="deadline">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="status">
                        <Select>
                            <Select.Option value="Todo">Todo</Select.Option>
                            <Select.Option value="In Progress">In Progress</Select.Option>
                            <Select.Option value="Done">Done</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default App;