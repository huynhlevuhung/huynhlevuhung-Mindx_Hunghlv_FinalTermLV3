import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "./data/users.js";
import teachers from "./data/teachers.js";
import teacherpositions from "./data/teacherpositions.js";

import User from "./models/User.js";
import Teacher from "./models/Teacher.js";
import TeacherPosition from "./models/TeacherPosition.js";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

function cleanData(data) {
  return data.map((item) => {
    let newItem = { ...item };

    // Xử lý ObjectId { $oid: ... }
    if (newItem._id && newItem._id.$oid) {
      newItem._id = newItem._id.$oid;
    }

    // Convert tất cả field $oid con (vd: teacherPositionsId, userId, degrees._id, ...)
    Object.keys(newItem).forEach((key) => {
      if (Array.isArray(newItem[key])) {
        newItem[key] = newItem[key].map((el) => (el && el.$oid ? el.$oid : el));
      } else if (newItem[key] && newItem[key].$oid) {
        newItem[key] = newItem[key].$oid;
      }
    });

    // Xử lý Date { $date: ... }
    if (newItem.startDate && newItem.startDate.$date) {
      newItem.startDate = new Date(newItem.startDate.$date);
    }
    if (newItem.endDate && newItem.endDate.$date) {
      newItem.endDate = new Date(newItem.endDate.$date);
    }
    if (newItem.dob && newItem.dob.$date) {
      newItem.dob = new Date(newItem.dob.$date);
    }

    // Xử lý degrees._id nếu có
    if (newItem.degrees && Array.isArray(newItem.degrees)) {
      newItem.degrees = newItem.degrees.map((deg) => {
        if (deg._id && deg._id.$oid) {
          return { ...deg, _id: deg._id.$oid };
        }
        return deg;
      });
    }

    // Nếu thiếu email thì tạo email fake để tránh lỗi
    if (!newItem.email && newItem.name) {
      newItem.email = `${newItem.name
        .toLowerCase()
        .replace(/\s+/g, "")}@example.com`;
    }

    return newItem;
  });
}

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Teacher.deleteMany();
    await TeacherPosition.deleteMany();

    // Dùng cleanData để chuẩn hóa dữ liệu
    const cleanUsers = cleanData(users);
    const cleanTeachers = cleanData(teachers);
    const cleanTeacherPositions = cleanData(teacherpositions);

    const createdUsers = await User.insertMany(cleanUsers);
    const createdTeacherPositions = await TeacherPosition.insertMany(
      cleanTeacherPositions
    );

    // Map teacher với user + teacherPositions
    const sampleTeachers = cleanTeachers.map((t, index) => {
      return {
        ...t,
        userId: createdUsers[index % createdUsers.length]._id,
        teacherPositions: [
          createdTeacherPositions[index % createdTeacherPositions.length]._id,
        ],
      };
    });

    await Teacher.insertMany(sampleTeachers);

    console.log("✅ Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Teacher.deleteMany();
    await TeacherPosition.deleteMany();

    console.log("❌ Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
