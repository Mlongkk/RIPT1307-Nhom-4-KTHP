import React, { useEffect, useState } from "react";

/* ================= TYPES ================= */

type Difficulty = "Dễ" | "Trung bình" | "Khó" | "Rất khó";

interface KnowledgeBlock {
    id: string;
    name: string;
}

interface Subject {
    id: string;
    code: string;
    name: string;
    credits: number;
}

interface Question {
    id: string;
    subjectId: string;
    content: string;
    difficulty: Difficulty;
    blockId: string;
}

interface ExamStructureItem {
    difficulty: Difficulty;
    blockId: string;
    quantity: number;
}

interface Exam {
    id: string;
    name: string;
    subjectId: string;
    questions: Question[];
}

/* ================= UTIL ================= */

const saveToLocal = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocal = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

const randomSelect = <T,>(arr: T[], quantity: number): T[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, quantity);
};

/* ================= COMPONENT ================= */

const QuanLyNganHang: React.FC = () => {
    const [blocks, setBlocks] = useState<KnowledgeBlock[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [exams, setExams] = useState<Exam[]>([]);

    /* ===== FORM STATES ===== */
    const [blockName, setBlockName] = useState("");

    const [subCode, setSubCode] = useState("");
    const [subName, setSubName] = useState("");
    const [credits, setCredits] = useState(0);

    const [qContent, setQContent] = useState("");
    const [qSubject, setQSubject] = useState("");
    const [qBlock, setQBlock] = useState("");
    const [qDifficulty, setQDifficulty] = useState<Difficulty>("Dễ");

    const [examName, setExamName] = useState("");
    const [examSubject, setExamSubject] = useState("");
    const [examBlock, setExamBlock] = useState("");
    const [examDifficulty, setExamDifficulty] = useState<Difficulty>("Dễ");
    const [examQuantity, setExamQuantity] = useState(1);

    /* ===== LOAD DATA ===== */
    useEffect(() => {
        setBlocks(getFromLocal("blocks"));
        setSubjects(getFromLocal("subjects"));
        setQuestions(getFromLocal("questions"));
        setExams(getFromLocal("exams"));
    }, []);

    /* ================= ADD ================= */

    const addBlock = () => {
        if (!blockName) return alert("Nhập tên khối!");
        const newBlock = { id: Date.now().toString(), name: blockName };
        const updated = [...blocks, newBlock];
        setBlocks(updated);
        saveToLocal("blocks", updated);
        setBlockName("");
    };

    const addSubject = () => {
        if (!subCode || !subName) return alert("Nhập đầy đủ môn!");
        const newSub = {
            id: Date.now().toString(),
            code: subCode,
            name: subName,
            credits,
        };
        const updated = [...subjects, newSub];
        setSubjects(updated);
        saveToLocal("subjects", updated);
        setSubCode("");
        setSubName("");
        setCredits(0);
    };

    const addQuestion = () => {
        if (!qContent || !qSubject || !qBlock)
            return alert("Thiếu thông tin câu hỏi!");

        const newQ: Question = {
            id: Date.now().toString(),
            subjectId: qSubject,
            content: qContent,
            difficulty: qDifficulty,
            blockId: qBlock,
        };

        const updated = [...questions, newQ];
        setQuestions(updated);
        saveToLocal("questions", updated);

        setQContent("");
    };

    /* ================= CREATE EXAM ================= */

    const createExam = () => {
        const filtered = questions.filter(
            (q) =>
                q.subjectId === examSubject &&
                q.blockId === examBlock &&
                q.difficulty === examDifficulty
        );

        if (filtered.length < examQuantity) {
            alert("Không đủ câu hỏi!");
            return;
        }

        const selected = randomSelect(filtered, examQuantity);

        const newExam: Exam = {
            id: Date.now().toString(),
            name: examName,
            subjectId: examSubject,
            questions: selected,
        };

        const updated = [...exams, newExam];
        setExams(updated);
        saveToLocal("exams", updated);

        alert("Tạo đề thành công!");
    };

    /* ================= UI ================= */

    return (
        <div style={{ padding: 20 }}>
            <h1>Hệ thống ngân hàng câu hỏi</h1>

            {/* ===== BLOCK ===== */}
            <h2>Khối kiến thức</h2>
            <input
                placeholder="Tên khối"
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
            />
            <button onClick={addBlock}>Thêm</button>
            {blocks.map((b) => (
                <div key={b.id}>- {b.name}</div>
            ))}

            {/* ===== SUBJECT ===== */}
            <h2>Môn học</h2>
            <input
                placeholder="Mã môn"
                value={subCode}
                onChange={(e) => setSubCode(e.target.value)}
            />
            <input
                placeholder="Tên môn"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Tín chỉ"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
            />
            <button onClick={addSubject}>Thêm</button>

            {subjects.map((s) => (
                <div key={s.id}>
                    {s.code} - {s.name} ({s.credits} tín chỉ)
                </div>
            ))}

            {/* ===== QUESTION ===== */}
            <h2>Câu hỏi</h2>
            <textarea
                placeholder="Nội dung"
                value={qContent}
                onChange={(e) => setQContent(e.target.value)}
            />

            <select onChange={(e) => setQSubject(e.target.value)}>
                <option value="">Chọn môn</option>
                {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setQBlock(e.target.value)}>
                <option value="">Chọn khối</option>
                {blocks.map((b) => (
                    <option key={b.id} value={b.id}>
                        {b.name}
                    </option>
                ))}
            </select>

            <select
                value={qDifficulty}
                onChange={(e) => setQDifficulty(e.target.value as Difficulty)}
            >
                <option>Dễ</option>
                <option>Trung bình</option>
                <option>Khó</option>
                <option>Rất khó</option>
            </select>

            <button onClick={addQuestion}>Thêm câu hỏi</button>

            {questions.map((q) => (
                <div key={q.id}>
                    [{q.difficulty}] {q.content}
                </div>
            ))}

            {/* ===== EXAM ===== */}
            <h2>Tạo đề thi</h2>

            <input
                placeholder="Tên đề"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
            />

            <select onChange={(e) => setExamSubject(e.target.value)}>
                <option value="">Chọn môn</option>
                {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setExamBlock(e.target.value)}>
                <option value="">Chọn khối</option>
                {blocks.map((b) => (
                    <option key={b.id} value={b.id}>
                        {b.name}
                    </option>
                ))}
            </select>

            <select
                value={examDifficulty}
                onChange={(e) => setExamDifficulty(e.target.value as Difficulty)}
            >
                <option>Dễ</option>
                <option>Trung bình</option>
                <option>Khó</option>
                <option>Rất khó</option>
            </select>

            <input
                type="number"
                value={examQuantity}
                onChange={(e) => setExamQuantity(Number(e.target.value))}
            />

            <button onClick={createExam}>Tạo đề</button>

            {/* ===== LIST EXAM ===== */}
            <h2>Danh sách đề thi</h2>
            {exams.map((e) => (
                <div key={e.id} style={{ border: "1px solid gray", margin: 10 }}>
                    <h4>{e.name}</h4>
                    {e.questions.map((q) => (
                        <div key={q.id}>- {q.content}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default QuanLyNganHang;