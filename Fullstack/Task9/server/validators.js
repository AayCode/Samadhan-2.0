export function validateStudent(payload) {
    const errors = [];

    if (!payload.name || typeof payload.name !== "string") {
        errors.push("Name is required and must be a string.");
    }

    if (!payload.email || typeof payload.email !== "string" || !payload.email.includes("@")) {
        errors.push("Valid email is required.");
    }

    if (!payload.course || typeof payload.course !== "string") {
        errors.push("Course is required and must be a string.");
    }

    if (payload.year == null || typeof payload.year !== "number" || payload.year < 1 || payload.year > 5) {
        errors.push("Year must be a number between 1 and 5.");
    }

    if (payload.gpa == null || typeof payload.gpa !== "number" || payload.gpa < 0 || payload.gpa > 10) {
        errors.push("GPA must be a number between 0 and 10.");
    }

    return {
        ok: errors.length === 0,
        errors,
    };
}
