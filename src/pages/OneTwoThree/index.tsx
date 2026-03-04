import React, {useEffect, useState} from "react";

const OneTwoThree: React.FC = () => {
    const arr = ["Kéo", "Búa", "Bao"];

    const STORAGE_KEY = 'one_two_three_result';
    const [history, setHistory] = useState<string[]>([]);

    const [botChoice, setBotChoice] = useState<string>("");

    const [playerChoice, setPlayerChoice] = useState<string>("");

    const handleClick = (index: number) => {
        const player = arr[index];
        const bot = arr[Math.floor(Math.random() * 3)];

        if (player === bot) {
            setHistory([...history, `Hòa (${player} vs ${bot})`]);
        } 
        else if ((index + 2) % 3 === arr.indexOf(bot)) {
            setHistory([...history, `Bạn thắng! (${player} vs ${bot})`]);
        } 
        else {
            setHistory([...history, `Bạn thua! (${player} vs ${bot})`]);
        }
        
        setPlayerChoice(player);
        setBotChoice(bot);
    };

      // Load từ localStorage
      useEffect(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          setHistory(JSON.parse(data));
        }
      }, []);
    
      // Lưu vào localStorage
      useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      }, [history]);


    return (
        <div>
            <h2>Trò chơi Kéo Búa Bao</h2>
            <p>Chọn một trong ba: Kéo, Búa, Bao</p>

            {arr.map((item, index) => (
                <button style={{ marginLeft: '2px', marginBottom: '6px' }} 
                key={index} onClick={() => handleClick(index)}>
                    {item} 
                </button> 
            ))}

            <p style={{ marginBottom: '6px' }}>Lựa chọn của bạn: <b>{playerChoice}</b></p> 
            <p style={{ marginBottom: '6px' }}>Lựa chọn của máy: <b>{botChoice}</b></p>
            
            <h3>Lịch sử kết quả:</h3>
            <ul>
                {history.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>

    );


};

export default OneTwoThree;