/* Variables */
const courseForm = document.getElementById("courseForm");
const P4CoursePositionForm = document.getElementById("P4CoursePosition");
const MS3DatabaseTypeForm = document.getElementById("MS3DatabaseTypeForm");
const P5CoursePositionForm = document.getElementById("P5CoursePosition");
const resetBtn = document.getElementById("resetBtn");

/**
 * Handles form to select which course the student is on
 * @param {form event} event 
 */
function handleCourseForm(event) {
    event.preventDefault();
    let form = event.target;
    let course = form.selectCourse.value;
    if (course === "4P") {
        P4CoursePositionForm.classList.remove("d-none");
        disableCourseForm()
    } else if (course === "5P") {
        P5CoursePositionForm.classList.remove("d-none");
        disableCourseForm()
    } else {
        /* Show feedback that must select an option */
        document.getElementById("courseFormFeedback").innerHTML = "Please select a course";
    }
}


/**
 * Handles form to select which section of the 4P course the student is on
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
        document.getElementById("signUpElephantSQLWrapper").classList.remove("d-none");
        document.getElementById("convertDynosWrapper").classList.remove("d-none");
        if (P4CoursePosition === "submittedMS3" || P4CoursePosition === "submittedMS4") {
            document.getElementById("migrateMS4Wrapper").classList.remove("d-none");
        }

        document.getElementById("MS3DatabaseTypeForm").classList.remove("d-none");
    } else {
        /* Show feedback that must select an option */
        document.getElementById("P4CoursePositionFormFeedback").innerHTML = "Please select your position in the 4P course course";
    }
}

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
        document.getElementById("actionResult").classList.remove("d-none");
    } else if (P5CoursePosition === "blank") {
        document.getElementById("P5CoursePositionFormFeedback").innerHTML = "Please select your position in the 5P course course";
    } else {
        disableP5CoursePositionForm();
        document.getElementById("signUpGSPWrapper").classList.remove("d-none");
        document.getElementById("signUpHerokuCreditsWrapper").classList.remove("d-none");
        document.getElementById("convertDynosWrapper").classList.remove("d-none");
        document.getElementById("actionResult").classList.remove("d-none");
        if (P5CoursePosition === "submittedPP3") {
            /* migrate PP4 */
            document.getElementById("migratePP4Wrapper").classList.remove("d-none");
            document.getElementById("actionResult").classList.remove("d-none");
        } else if (P5CoursePosition === "submittedPP4eComm" || P5CoursePosition === "submittedPP5eComm") {
            /* migrate PP5 ecomm */
            document.getElementById("migratePP4Wrapper").classList.remove("d-none");
            document.getElementById("migratePP5EcommWrapper").classList.remove("d-none");
            document.getElementById("actionResult").classList.remove("d-none");
        } else if (P5CoursePosition === "submittedPP4AdvFE" || P5CoursePosition === "submittedPP5AdvFE") {
            // migrate API part of project
            document.getElementById("migratePP4Wrapper").classList.remove("d-none");
            document.getElementById("migratePP5DRFWrapper").classList.remove("d-none");
            document.getElementById("actionResult").classList.remove("d-none");
        } else if (P5CoursePosition === "submittedPP4PredAn" || P5CoursePosition === "submittedPP5PredAn") {
            // don't need to migrate PredAn project - no db
            document.getElementById("migratePP4Wrapper").classList.remove("d-none");
            document.getElementById("actionResult").classList.remove("d-none");
        }
    } 
}


/**
 * Handles form to select which type of database was used for MS3
 * @param {form event} event 
 */
function handleMS3DatabaseType(event) {
    event.preventDefault();
    let form = event.target;
    MS3DatabaseType = form.selectMS3DatabaseType.value;
    if (MS3DatabaseType === "MS3Postgres" || MS3DatabaseType === "MS3PostgresAndMongoDB") {
        disableMS3DatabaseTypeForm();
        document.getElementById("migrateMS3Wrapper").classList.remove("d-none");
        document.getElementById("actionResult").classList.remove("d-none");
    } else if (MS3DatabaseType === "MS3MongoDB") {
        disableMS3DatabaseTypeForm();
        document.getElementById("actionResult").classList.remove("d-none");
    } else {
        document.getElementById("MS3DatabaseTypeFormFeedback").innerHTML = "Please select the type of database your MS3 uses";
    }

}

/**
 * Disable course form dropdown and its submit button.
 */
function disableCourseForm() {
    document.getElementById("selectCourse").disabled = true;
    document.getElementById("courseFormSubmitBtn").disabled = true;
    document.getElementById("courseFormFeedback").innerHTML = "";
}

/**
 * Disable 4P course position form dropdown and its submit button.
 */
function disableP4CoursePositionForm() {
    document.getElementById("selectP4CoursePosition").disabled = true;
    document.getElementById("selectP4CoursePositionSubmitBtn").disabled = true;
    document.getElementById("P4CoursePositionFormFeedback").innerHTML = "";
}

function disableMS3DatabaseTypeForm() {
    document.getElementById("selectMS3DatabaseType").disabled = true;
    document.getElementById("selectMS3DatabaseTypeSubmitBtn").disabled = true;
    document.getElementById("MS3DatabaseTypeFormFeedback").innerHTML = "";
}

function disableP5CoursePositionForm() {
    document.getElementById("selectP5CoursePosition").disabled = true;
    document.getElementById("selectP5CoursePositionSubmitBtn").disabled = true;
    document.getElementById("P5CoursePositionFormFeedback").innerHTML = "";
}


function showNoActionNeededResult() {
    document.getElementById("noActionNeeded").classList.remove("d-none");
}


function resetForm() {
    location.reload(true);
}

/* Event listeners */
courseForm.addEventListener("submit", handleCourseForm);
P4CoursePositionForm.addEventListener("submit", handle4PCoursePositionForm);
MS3DatabaseTypeForm.addEventListener("submit", handleMS3DatabaseType);
P5CoursePositionForm.addEventListener("submit", handleP5CoursePositionForm);
resetBtn.addEventListener("click", resetForm);