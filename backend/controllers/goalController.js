const asyncHandler = require('express-async-handler'); // description: https://www.npmjs.com/package/express-async-handler


const Goal = require('../models/goalModel');

//@desc Get the goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    // const goals = await Goal.find({});
    const goals = await Goal.find({ user: req.user._id });


    res.status(200).json({ message: 'Getting goals', goals }); 
})   
//@desc Add a goal
//@route POST /api/goals
//@access Private
const addGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('No goal text');
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user._id
    })
    // console.log(req.body);
    res.status(200).json({ message: 'Goal added successfully!', goal });
})

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(goal) {
        if(goal.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this goal');
        }
        goal.text = req.body.text || goal.text;
        const updatedGoal = await goal.save();
        res.status(200).json({ message: 'Goal updated successfully!', updatedGoal });
    } else {
        res.status(404);
        throw new Error('Goal not found');
    }
})

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(goal) {
        if(goal.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to delete this goal');
        }
        await goal.remove();
    } else {
        res.status(404);
        throw new Error('Goal not found');
    }
    res.status(200).json({ message: 'Goal deleted successfully!', goal });
})

module.exports = { getGoals, addGoal, updateGoal, deleteGoal }