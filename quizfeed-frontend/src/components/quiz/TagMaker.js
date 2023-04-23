import './TagMaker.css';
import React, {useContext} from 'react';
import { QuizMakerContext } from './QuizMaker';

/*
* Individual tag
* index: The given tag's index in the given quiz
* tag:   The given tag
*/
function TagMaker({ index, tag }) {
    const [quizData, setQuizData, txt] = useContext(QuizMakerContext);

    function deleteTag(e) {
        const left = quizData.tags.slice(0, index);
        const right = quizData.tags.slice(index + 1, quizData.tags.length);
        setQuizData({
            ...quizData,
            tags: left.concat(right)
        });
    }
    
    function updateTag(e) {
        const text = txt(e);
        // if given tag text is empty (or just whitespace), delete tag
        if (text.trim() === "") {
            deleteTag(e);
        } else { // otherwise, update
            let tags = quizData.tags.map((v, i) => {
              return i !== index ?  v : {...v, text: text};
            });
            setQuizData({
                ...quizData,
                tags: tags
            });
        }
    }

    return(
        <span
            className="tag-text"
            onBlur={updateTag}
            contentEditable
            suppressContentEditableWarning={true}
        >
            {tag.text}
        </span>
    );
}

export default TagMaker;