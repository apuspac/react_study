import React, { FC, useState } from 'react'

const InputForm: FC<{ updateTaskList: (test: string) => void }> = ({ updateTaskList }) => {
    const [inputText, setInputText] = useState<string>("");

    const handleSubmit = (event: any) => {
        // 再レンダリング阻止
        event.preventDefault();

        // タスクを追加する
        updateTaskList(inputText);

        //入力欄の文字を消す
        setInputText("");
    }

    const handleChange = (event: any) => {
        //setInputTextを通して、 inputTextに追加される。
        setInputText(event.target.value);
    }

    return (
        <div className='inputForm'>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={e => handleChange(e)} value={inputText} />
                <button>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </form>
        </div>
    )
}

export default InputForm;