// These two arrays need to be equal size! The choice theme is chosen based on the question theme
// View in ./Quiz.css
const questionTheme = ['q-darkBlue', 'q-mediumBlue', 'q-lightBlue'];
// View in ../StyledButton.cs
const choiceTheme = ['b-mediumBlue', 'b-lightBlue', 'b-white'];

function QuestionTheme(variant, questionIndex) {
    if (variant) {
        return variant;
    }

    return questionTheme[questionIndex % questionTheme.length]
}

// chosen: -1 if no choice has been chosen yet, otherwise should be index of chosen choice
function ChoiceTheme(variant, questionIndex, choiceIndex, chosen) {
    let suffix = '';
    if (chosen !== -1 && chosen !== choiceIndex) suffix = '-notChosen';

    if (variant) {
        return variant + suffix;
    }

    return choiceTheme[questionIndex % questionTheme.length] + suffix;
}

export { QuestionTheme, ChoiceTheme };