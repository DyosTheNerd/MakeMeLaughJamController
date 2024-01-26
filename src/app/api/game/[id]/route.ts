

// a get route that returns the parameter id as a json object
export default function(req:any, res:any) {
    res.json({id: req.params.id});
}
