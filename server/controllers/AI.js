const Groq = require("groq-sdk");
const Course = require("../models/Course");
const User = require("../models/User");


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.askAI = async (req, res) => {
  try {
    const { question } = req.body;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    return res.status(200).json({
      success: true,
      answer:
        chatCompletion.choices[0].message.content,
    });

  } catch (error) {

    console.log("AI ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.recommendCourses = async (req, res) => {
  try {

    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate({
        path: "courses",
        select: "courseName courseDescription",
      });

    const allCourses = await Course.find({})
      .select(
        "courseName courseDescription thumbnail price"
      );

    const enrolledCourseNames =
      user?.courses?.map(
        (course) => course.courseName
      ) || [];

    const availableCourses =
      allCourses
        .filter(
          (course) =>
            !enrolledCourseNames.includes(
              course.courseName
            )
        )
        .map(
          (course) =>
            `${course.courseName}: ${course.courseDescription}`
        );

    const prompt = `
Student Completed / Enrolled Courses:

${enrolledCourseNames.join("\n")}

Available Courses:

${availableCourses.join("\n")}

Recommend ONLY 3 courses from the available courses.

Return ONLY course names.

Example:

React
Node.js
MongoDB
`;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    const recommendationText =
      chatCompletion.choices[0].message.content;

    return res.status(200).json({
      success: true,
      recommendations: recommendationText,
    });

  } catch (error) {

    console.log(
      "RECOMMENDATION ERROR =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};