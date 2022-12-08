const asyncHandler = require('express-async-handler'); // description: https://www.npmjs.com/package/express-async-handler

//@desc Get the goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Getting goals' }); 
})   
//@desc Set a goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {

    if(!req.body.text) {
        res.status(400)
        throw new Error('No goal text');
    }

    console.log(req.body);

    res.status(200).json({ message: 'Setting/Adding goal' });
})

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Editing/Updating '+req.params.id});
})

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Remove/Delete goal!'+req.params.id });
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }