//@desc Get the goals
//@route GET /api/goals
//@access Private
const getGoals = (req, res) => {
    res.status(200).json({ message: 'Getting goals' });    
}
//@desc Set a goal
//@route POST /api/goals
//@access Private
const setGoal = (req, res) => {

    if(!req.body.text) {
        return res.status(400).json({ message: 'Please add a text field to your goal' })
    }

    console.log(req.body);

    res.status(200).json({ message: 'Setting/Adding goal' });
}

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal =  (req, res) => {
    res.status(200).json({ message: 'Editing/Updating '+req.params.id});
}

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal =  (req, res) => {
    res.status(200).json({ message: 'Remove/Delete goal!'+req.params.id });
}

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }