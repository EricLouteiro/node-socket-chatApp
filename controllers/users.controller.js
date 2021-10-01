
const usersGet = (req, res) => {

    const query = req.query; /* aqui se extraen las query params provenientes del GET al url */
    res.json({
        res: 'get',
        query
    })
};

const usersPost = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({
        res: 'post',
        body
    })
}
const usersPut = (req, res) => {

    res.json({
        res: 'put'
    })
}
const usersPatch = (req, res) => {

    res.json({
        res: 'patch'
    })
}
const usersDelete = (req, res) => {

    res.json({
        res: 'delete'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}