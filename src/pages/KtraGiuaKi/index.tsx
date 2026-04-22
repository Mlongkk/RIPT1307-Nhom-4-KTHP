import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import {
    Table,
    Button,
    Input,
    Modal,
    Form,
    InputNumber,
    Select,
    message,
    Space,
    Tag,
    Card,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

// 👉 danh sách người phụ trách
const managers = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C'];

type RoomType = 'ly_thuyet' | 'thuc_hanh' | 'hoi_truong';

interface Room {
    id: string;
    name: string;
    capacity: number;
    type: RoomType;
    manager: string;
}

interface Props {
    dispatch: any;
    room: {
        list: Room[];
    };
}

const RoomPage: React.FC<Props> = ({ dispatch, room }) => {
    const [visible, setVisible] = useState(false);
    const [editing, setEditing] = useState<Room | null>(null);
    const [keyword, setKeyword] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>();
    const [managerFilter, setManagerFilter] = useState<string>();
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch({ type: 'room/fetch' });
    }, [dispatch]);

    const openModal = (record?: Room) => {
        setEditing(record || null);
        setVisible(true);
        record ? form.setFieldsValue(record) : form.resetFields();
    };

    const submit = async () => {
        try {
            const values: Room = await form.validateFields();

            await dispatch({
                type: editing ? 'room/update' : 'room/add',
                payload: values,
            });

            message.success(editing ? 'Cập nhật thành công' : 'Thêm thành công');
            setVisible(false);
        } catch (e: any) {
            if (e.message === 'duplicate') {
                message.error('Trùng mã');
            }
        }
    };

    const remove = (r: Room) => {
        Modal.confirm({
            title: 'Bạn chắc chắn muốn xóa?',
            onOk: async () => {
                try {
                    await dispatch({ type: 'room/remove', payload: r.id });
                    message.success('Đã xóa');
                } catch (e: any) {
                    if (e.message === 'capacity') {
                        message.error('Chỉ xóa phòng dưới 30 chỗ');
                    }
                }
            },
        });
    };

    const data = room.list
        .filter((i: Room) => {
            const kw = keyword.toLowerCase();
            return (
                i.id.toLowerCase().includes(kw) ||
                i.name.toLowerCase().includes(kw)
            );
        })
        .filter((i: Room) =>
            typeFilter ? i.type === typeFilter : true
        )
        .filter((i: Room) =>
            managerFilter ? i.manager === managerFilter : true
        );

    return (
        <Card title="Đề 4: Quản lý phòng học" style={{ margin: 15 }}>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search
                    placeholder="Tìm theo mã / tên"
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <Select
                    style={{ width: 160 }}
                    allowClear
                    placeholder="Loại phòng"
                    onChange={(v) => setTypeFilter(v)}
                >
                    <Option value="ly_thuyet">Lý thuyết</Option>
                    <Option value="thuc_hanh">Thực hành</Option>
                    <Option value="hoi_truong">Hội trường</Option>
                </Select>

                <Select
                    style={{ width: 180 }}
                    allowClear
                    placeholder="Người phụ trách"
                    onChange={(v) => setManagerFilter(v)}
                >
                    {managers.map((m) => (
                        <Option key={m} value={m}>
                            {m}
                        </Option>
                    ))}
                </Select>

                <Button type="primary" onClick={() => openModal()}>
                    + Thêm
                </Button>
            </Space>

            <Table
                rowKey="id"
                dataSource={data}
                columns={[
                    { title: 'Mã', dataIndex: 'id', align: 'center', width: 100 },
                    { title: 'Tên phòng', dataIndex: 'name', align: 'center', width: 200 },
                    {
                        title: 'Số chỗ',
                        align: 'center', 
                        dataIndex: 'capacity',
                        sorter: (a: Room, b: Room) => a.capacity - b.capacity,
                    },
                    {
                        title: 'Loại',
                        align: 'center',
                        dataIndex: 'type', 
                        render: (t: RoomType) => (
                            <Tag color={t === 'ly_thuyet' ? 'blue' : t === 'thuc_hanh' ? 'green' : 'gold'}>
                                {t}
                            </Tag>
                        ),
                    },
                    {
                        title: 'Người phụ trách',
                        dataIndex: 'manager',
                        align: 'center',
                        render: (m: string) => <Tag color="purple">{m}</Tag>,
                    },
                    {
                        title: 'Hành động',
                        align: 'center',
                        render: (_: any, r: Room) => (
                            <Space>
                                <Button onClick={() => openModal(r)} icon={<EditOutlined />} />
                                <Button danger onClick={() => remove(r)} icon={<DeleteOutlined />} />
                            </Space>
                        ),
                    },
                ]}
            />

            <Modal
                visible={visible}
                onOk={submit}
                onCancel={() => setVisible(false)}
                title={editing ? 'Sửa phòng' : 'Thêm phòng'}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="id"
                        label="Mã phòng"
                        rules={[
                            { required: true, message: 'Không được để trống' },
                            { max: 10, message: 'Tối đa 10 ký tự' },
                        ]}
                    >
                        <Input disabled={!!editing} />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Tên phòng"
                        rules={[
                            { required: true },
                            { max: 50 },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="capacity"
                        label="Số chỗ"
                        rules={[
                            { required: true },
                            { type: 'number', min: 10, max: 200 },
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Loại phòng"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="ly_thuyet">Lý thuyết</Option>
                            <Option value="thuc_hanh">Thực hành</Option>
                            <Option value="hoi_truong">Hội trường</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="manager"
                        label="Người phụ trách"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            {managers.map((m) => (
                                <Option key={m} value={m}>
                                    {m}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default connect(({ room }: any) => ({ room }))(RoomPage);