/* Variables */
const courseForm = document.getElementById("courseForm");
const P4CoursePositionForm = document.getElementById("P4CoursePosition");
const MS3DatabaseType = document.getElementById("MS3DatabaseType");

/**
 * Handles form to select which course the student is on
 * @param {form event} event 
 */
function handleCourseForm(event) {
    event.preventDefault();
    let form = event.target;
    let course = form.selectCourse.value;
    console.log(course);
}


/**
 * Handles form to select which section of the 4P course the student is on
 * @param {form event} event 
 */
function handle4PCoursePositionForm(event) {
    event.preventDefault();
    let form = event.target;
    let P4CoursePosition = form.selectP4CoursePosition.value;
    console.log(P4CoursePosition);
}


/**
 * Handles form to select which type of database was used for MS3
 * @param {form event} event 
 */
function handleMS3DatabaseType(event) {
    event.preventDefault();
    let form = event.target;
    let MS3DatabaseType = form.selectMS3DatabaseType.value;
    console.log(MS3DatabaseType);
}

/* Event listeners */
courseForm.addEventListener("submit", handleCourseForm);
P4CoursePositionForm.addEventListener("submit", handle4PCoursePositionForm);
MS3DatabaseType.addEventListener("submit", handleMS3DatabaseType)