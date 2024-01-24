/* Variables */
const courseForm = document.getElementById("courseForm");
const P4CoursePositionForm = document.getElementById("P4CoursePosition");
const MS3DatabaseTypeForm = document.getElementById("MS3DatabaseTypeForm");
const P5CoursePositionForm = document.getElementById("P5CoursePosition");
const supportBtn = document.getElementById("supportBtn");
const resetBtn = document.getElementById("resetBtn");

/**
 * Handle form to select which course the student is on.
 * Display the next relevant dropdown menu for the selected course.
 * Provide feedback if the student tries to submit without
 * making a selection.
 * @param {form event} event 
 */
function handleCourseForm(event) {
    event.preventDefault();
    let form = event.target;
    let course = form.selectCourse.value;
    if (course === "4P") {
        P4CoursePositionForm.classList.remove("d-none");
        disableCourseForm();
    } else if (course === "5P") {
        P5CoursePositionForm.classList.remove("d-none");
        disableCourseForm();
    } else if (course === "BC") {
        showActionResult();
        disableCourseForm();
        document.getElementById("signUpGSPBCWrapper").classList.remove("d-none");
        document.getElementById("signUpHerokuCreditsWrapper").classList.remove("d-none");
        document.getElementById("convertDynosWrapper").classList.remove("d-none");
    } else {
        document.getElementById("courseFormFeedback").innerHTML = "Please select a course";
    }
}


/**
 * Handle form to select which section of the 4P course the student is on.
 * Check course position selection made by student and remove d-none (display: none;) 
 * class from the relevant checklist items in the #actionResult section of the page. 
 * If student has worked on MS3, show form to select which DB type their project uses.
 * @param {form event} event 
 */
function handle4PCoursePositionForm(event) {
    event.preventDefault();
    let form = event.target;
    let P4CoursePosition = form.selectP4CoursePosition.value;

    if (P4CoursePosition === "noSubmissions") {
        disableP4CoursePositionForm();
        showNoActionNeededResult();
    } else if (P4CoursePosition === "submittedMS1") {
        disableP4CoursePositionForm();
        document.getElementById("signUpGSPWrapper").classList.remove("d-none");
        document.getElementById("actionResult").classList.remove("d-none");
    } else if (P4CoursePosition === "submittedMS2" || P4CoursePosition === "submittedMS3" || P4CoursePosition === "submittedMS4") {
        disableP4CoursePositionForm();

        document.getElementById("signUpGSPWrapper").classList.remove("d-none");
        document.getElementById("signUpHerokuCreditsWrapper").classList.remove("d-none");
        document.getElementById("convertDynosWrapper").classList.remove("d-none");

        if (P4CoursePosition === "submittedMS3" || P4CoursePosition === "submittedMS4") {
            document.getElementById("signUpElephantSQLWrapper").classList.remove("d-none");
            document.getElementById("migrateMS4Wrapper").classList.remove("d-none");
        }

        showHerokuTasksInfoText();
        document.getElementById("MS3DatabaseTypeForm").classList.remove("d-none");
    } else {
        document.getElementById("P4CoursePositionFormFeedback").innerHTML = "Please select your position in the 4P course course";
    }
}


/**
 * Handle form to select which section of the 5P course the student is on.
 * Provide feedback if student tries to submit form without selecting a valid choice.
 * Check course position selection and remove d-none (display: none;) 
 * class from the relevant checklist items in the #actionResult section of the page.
 * @param {form event} event 
 */
function handleP5CoursePositionForm(event) {
    event.preventDefault();
    let form = event.target;
    let P5CoursePosition = form.selectP5CoursePosition.value;
    if (P5CoursePosition === "no5PSubmissions") {
        disableP5CoursePositionForm();
        showNoActionNeededResult();
    } else if (P5CoursePosition === "submittedPP1") {
        disableP5CoursePositionForm();
        document.getElementById("signUpGSPWrapper").classList.remove("d-none");
        showActionResult();
    } else if (P5CoursePosition === "blank") {
        document.getElementById("P5CoursePositionFormFeedback").innerHTML = "Please select your position in the 5P course course";
    } else {
        disableP5CoursePositionForm();
        document.getElementById("signUpGSPWrapper").classList.remove("d-none");
        document.getElementById("signUpHerokuCreditsWrapper").classList.remove("d-none");
        document.getElementById("convertDynosWrapper").classList.remove("d-none");
        if (P5CoursePosition === "submittedPP3") {
            /* migrate PP4 */
            document.getElementById("migratePP4Wrapper").classList.remove("d-none");
        } else if (P5CoursePosition === "submittedPP4eComm" || P5CoursePosition === "submittedPP5eComm") {
            /* migrate PP5 ecomm */
            document.getElementById("migratePP4Wrapper").classList.remove("d-none");
            document.getElementById("migratePP5EcommWrapper").classList.remove("d-none");
        } else if (P5CoursePosition === "submittedPP4AdvFE" || P5CoursePosition === "submittedPP5AdvFE") {
            // migrate API part of project
            document.getElementById("migratePP4Wrapper").classList.remove("d-none");
            document.getElementById("migratePP5DRFWrapper").classList.remove("d-none");
        } else if (P5CoursePosition === "submittedPP4PredAn" || P5CoursePosition === "submittedPP5PredAn") {
            // don't need to migrate PredAn project - no db
            document.getElementById("migratePP4Wrapper").classList.remove("d-none");
        }
        showHerokuTasksInfoText();
        showActionResult();
    } 
}


/**
 * Handles form to select which type of database was used for MS3 and display the relevant checklist item
 * for students who used a Postgres Database.
 * @param {form event} event 
 */
function handleMS3DatabaseType(event) {
    event.preventDefault();
    let form = event.target;
    let MS3DatabaseType = form.selectMS3DatabaseType.value;
    if (MS3DatabaseType === "MS3Postgres" || MS3DatabaseType === "MS3PostgresAndMongoDB") {
        disableMS3DatabaseTypeForm();
        document.getElementById("signUpElephantSQLWrapper").classList.remove("d-none");
        document.getElementById("migrateMS3Wrapper").classList.remove("d-none");
        showHerokuTasksInfoText();
        showActionResult();
    } else if (MS3DatabaseType === "MS3MongoDB") {
        disableMS3DatabaseTypeForm();
        showHerokuTasksInfoText();
        showActionResult();
    } else {
        document.getElementById("MS3DatabaseTypeFormFeedback").innerHTML = "Please select the type of database your MS3 uses";
    }
}


/**
 * Disable course form dropdown and its submit button
 * so if student wants to make changes they have to refresh the page to start again.
 */
function disableCourseForm() {
    document.getElementById("selectCourse").disabled = true;
    document.getElementById("courseFormSubmitBtn").disabled = true;
    document.getElementById("courseFormFeedback").innerHTML = "";
}


/**
 * Disable 4P course position form dropdown and its submit button.
 * so if student wants to make changes they have to refresh the page to start again.
 */
function disableP4CoursePositionForm() {
    document.getElementById("selectP4CoursePosition").disabled = true;
    document.getElementById("selectP4CoursePositionSubmitBtn").disabled = true;
    document.getElementById("P4CoursePositionFormFeedback").innerHTML = "";
}


/**
 * Disable MS3 database type form dropdown and its submit button.
 * so if student wants to make changes they have to refresh the page to start again.
 */
function disableMS3DatabaseTypeForm() {
    document.getElementById("selectMS3DatabaseType").disabled = true;
    document.getElementById("selectMS3DatabaseTypeSubmitBtn").disabled = true;
    document.getElementById("MS3DatabaseTypeFormFeedback").innerHTML = "";
}


/**
 * Disable 5P course position form dropdown and its submit button.
 * so if student wants to make changes they have to refresh the page to start again.
 */
function disableP5CoursePositionForm() {
    document.getElementById("selectP5CoursePosition").disabled = true;
    document.getElementById("selectP5CoursePositionSubmitBtn").disabled = true;
    document.getElementById("P5CoursePositionFormFeedback").innerHTML = "";
}


/**
 * Show extra information for tasks involving Heroku 
 * (end date and responsibility of student to ensure tasks are complete)
 */
function showHerokuTasksInfoText() {
    let elements = document.getElementsByClassName("herokuTasksInfoText");
    for (let element of elements) {
        element.classList.remove("d-none");
    }
}


/**
* Show div with information for students who do not need to take any actions
*/
function showNoActionNeededResult() {
    document.getElementById("noActionNeeded").classList.remove("d-none");
}


/**
 * Show div containing the final checklist and scroll user to the bottom of the page
 */
function showActionResult() {
    document.getElementById("actionResult").classList.remove("d-none");
    window.scrollTo(0,document.body.scrollHeight);
}


/**
 * Show div containing the information on where to get support with the steps,
 * and scroll user to the bottom of the page
 */
function showSupportInfo() {
    document.getElementById("supportInfo").classList.remove("d-none");
    window.scrollTo(0,document.body.scrollHeight);
}


/**
 * Refresh the page
 */
function resetForm() {
    location.reload(true);
}


/* Event listeners */
courseForm.addEventListener("submit", handleCourseForm);
P4CoursePositionForm.addEventListener("submit", handle4PCoursePositionForm);
MS3DatabaseTypeForm.addEventListener("submit", handleMS3DatabaseType);
P5CoursePositionForm.addEventListener("submit", handleP5CoursePositionForm);
supportBtn.addEventListener("click", showSupportInfo);
resetBtn.addEventListener("click", resetForm);