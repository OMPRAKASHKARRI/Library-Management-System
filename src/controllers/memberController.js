const User = require("../models/User");
const Borrow = require("../models/Borrow");

// Get All Members (Librarian)
exports.getAllMembers = async (req, res, next) => {
  try {
    const members = await User.find({ role: "member" }).select("-password");

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Member (Librarian)
exports.deleteMember = async (req, res, next) => {
  try {
    const member = await User.findById(req.params.id);

    if (!member) {
      const error = new Error("Member not found");
      error.statusCode = 404;
      throw error;
    }

    if (member.role !== "member") {
      const error = new Error("Only member accounts can be deleted");
      error.statusCode = 400;
      throw error;
    }

    await member.deleteOne();

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// My Borrowed Books (Member)
exports.getMyBorrowedBooks = async (req, res, next) => {
  try {
    const borrowedBooks = await Borrow.find({
      member: req.user._id,
      status: "borrowed",
    })
      .populate("book")
      .sort({ borrowDate: -1 });

    res.status(200).json({
      success: true,
      count: borrowedBooks.length,
      data: borrowedBooks,
    });
  } catch (error) {
    next(error);
  }
};